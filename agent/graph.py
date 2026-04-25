from langchain_groq import ChatGroq
from prompts import *
from states import *
from langgraph.graph import StateGraph, START, END
from file_tools import *
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.globals import set_debug,set_verbose
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
import os
import json

from dotenv import load_dotenv
load_dotenv()

#set_debug(True)
#set_verbose(True)

# planner_llm = ChatGroq(
#     model="llama-3.1-8b-instant",
#     temperature=0
# )

# architect_llm = ChatGroq(
#     model="llama-3.1-8b-instant",
#     temperature=0
# )
llm=ChatGroq(model="openai/gpt-oss-120b")
#llm=ChatGroq(model="qwen/qwen3-32b")
#llm=ChatGroq(model="llama-3.1-8b-instant",temperature=0)
#llm=ChatGoogleGenerativeAI(model="gemini-2.5-pro")
# llm=ChatOpenAI(model="deepseek/deepseek-coder:free",api_key=os.getenv("OPENROUTER_API_KEY"),base_url="https://openrouter.ai/api/v1", default_headers={
#         "HTTP-Referer": "http://localhost",
#         "X-Title": "LangGraph-App"
#     })
memory=MemorySaver()
key=1076
def planner_agent(state: dict)->dict:
    """Converts user prompt into a structured Plan."""
    user_prompt=state["user_prompt"]
    res=llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt))
    
    if res is None:
        raise  ValueError("Planner did not return a valid response")
    return {"plan":res} 

def architect_agent(state: dict)->dict:
    """Creates TaskPlan from Plan."""
    plan: Plan=state["plan"]
    
    res=llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan=plan.model_dump_json()))
    if res is None:
        raise  ValueError("Architect did not return a valid response")
    res.plan=plan
    print(res.model_dump_json())
    return {"task_plan":res}


def coder_agent(state: dict)->dict:
    """LangGraph tool-using coder agent."""
    coder_state: CoderState=state.get("coder_state")
    if coder_state is None:
        coder_state=CoderState(task_plan=state["task_plan"],current_step_idx=0)

    steps=coder_state.task_plan.implementation_steps
    if coder_state.current_step_idx >= len(steps):
        return {"coder_state":coder_state, "status":"DONE"}
    
    current_task=steps[coder_state.current_step_idx]

    existing_content=read_file.run(current_task.filepath)
    system_prompt=coder_system_prompt()
    user_prompt=(
        f"Task: {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing content:\n{existing_content}\n"
        "Use write_file(path,content) to save your changes."
    )
    
    
    coder_tools=[read_file,write_file,list_files]
    agent=create_agent(llm,coder_tools)
    
    agent.invoke({"messages":[{"role":"system","content":system_prompt},
                              {"role":"user","content":user_prompt}]})
    
    # agent=llm.bind_tools(coder_tools)

    # agent.invoke([
    #     ("system",system_prompt),
    #     ("user",user_prompt)
    # ])
    coder_state.current_step_idx+=1
    return {"coder_state":coder_state}


graph=StateGraph(dict)
graph.add_node("planner",planner_agent)
graph.add_node("architect",architect_agent)
graph.add_node("coder",coder_agent)

graph.add_edge("planner","architect")
graph.add_edge("architect","coder")
graph.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END,"coder": "coder"}

)

graph.set_entry_point("planner")

agent=graph.compile(checkpointer=memory)


if __name__=="__main__":
    user_prompt=input("Enter your project prompt: ")
    result=agent.invoke({"user_prompt":user_prompt},{"recursion_limit":100,"configurable":{"thread_id":key}})

    print(result)
