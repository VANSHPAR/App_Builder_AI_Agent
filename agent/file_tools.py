import pathlib
import subprocess
from typing import Tuple
from langchain_core.tools import tool

PROJECT_ROOT=(pathlib.Path(__file__).parent / "generated_project").resolve()

# def safe_path_for_project(path: str)->pathlib.Path:
#     p=(PROJECT_ROOT / path).resolve()
#     # if PROJECT_ROOT.resolve() not in p.parents and PROJECT_ROOT.resolve() != p.parent and PROJECT_ROOT.resolve() != p:
#     if not p.is_relative_to(PROJECT_ROOT.resolve()):
#         raise ValueError("Attempt to write outside project root")
#     return p

def safe_path_for_project(path: str)->pathlib.Path:
    if not path or path in [".", "./"]:
        return PROJECT_ROOT

    # Normalize
    path = path.lstrip("/")

    root = PROJECT_ROOT
    p = (root / path).resolve()

    # Strong sandbox check
    try:
        p.relative_to(root)
    except ValueError:
        raise ValueError("Attempt to write outside project root")

    return p

# @tool
# def write_file(path: str,content: str)->str:
#     """Writes content to a file at the specified path within the project root."""
#     p=safe_path_for_project(path)
#     p.parent.mkdir(parents=True,exist_ok=True)
#     with open(p,"w",encoding="utf-8") as f:
#         f.write(content)
#     return f"WROTE: {p}"

@tool
def write_file(path: str,content: str)->str:
    """Writes content to a file at the specified path within the project root."""
    if not path:
        return "ERROR: Empty path provided."
    
    path = path.lstrip("/")

    # Block traversal attempts
    if ".." in path:
        return "ERROR: Parent directory access is not allowed."
    
    p=safe_path_for_project(path)
    p.parent.mkdir(parents=True,exist_ok=True)
    with open(p,"w",encoding="utf-8") as f:
        f.write(content)
    return f"WROTE: {p}"

# @tool
# def read_file(path: str)->str:
#     """Reads content from a file at the specified path within the project root."""
#     p=safe_path_for_project(path)
#     if not p.exists():
#         return ""
#     with open(p,"r",encoding="utf-8") as f:
#         return f.read()

@tool
def read_file(path: str)->str:
    """Reads content from a file at the specified path within the project root."""
    if not path:
        return "ERROR: Empty path provided."

    path = path.lstrip("/")

    if ".." in path:
        return "ERROR: Parent directory access is not allowed."
    
    p=safe_path_for_project(path)
    if not p.exists():
        return ""
    with open(p,"r",encoding="utf-8") as f:
        return f.read()
    
@tool
def get_current_directory()->str:
    """Returns the current working directory."""
    return str(PROJECT_ROOT)

# @tool
# def list_files(directory: str = ".")->list:
#     """Lists all files in the specified directory within the project root."""
    
#     p=safe_path_for_project(directory)
#     if not p.is_dir():
#         return f"ERROR: {p} is not a directory"
#     files=[
#         str(f.relative_to(PROJECT_ROOT))
#         for f in p.glob("**/*") 
#         if f.is_file()
#         ]
#     return "\n".join(files) if files else "No files found."

@tool
def list_files(directory: str = ".")->list:
    """Lists all files in the specified directory within the project root."""
    if directory in ["",".","./",None]:
        directory=""
    directory=directory.lstrip("/")

    if ".." in directory:
        return "ERROR: Parent directory access is not allowed."

    p=safe_path_for_project(directory)


    if not p.exists():
        return f"ERROR: Path does not exist: {directory}"
    
    if not p.is_dir():
        return f"ERROR: {p} is not a directory"
    files=[
        str(f.relative_to(PROJECT_ROOT))
        for f in p.glob("**/*") 
        if f.is_file()
        ]
    return "\n".join(files) if files else "No files found."


@tool
def run_cmd(cmd: str, cwd: str=None, timeout: int = 30)-> Tuple[int,str,str]:
    """Runs a shell command in the specified directory and returns the result."""
    p=safe_path_for_project(cwd) if cwd else PROJECT_ROOT
    res=subprocess.run(cmd,shell=True, cwd=str(p), capture_output=True,text=True, timeout=timeout)
    return res.returncode, res.stdout, res.stderr

def init_project_root():
    PROJECT_ROOT.mkdir(parents=True,exist_ok=True)
    return str(PROJECT_ROOT)