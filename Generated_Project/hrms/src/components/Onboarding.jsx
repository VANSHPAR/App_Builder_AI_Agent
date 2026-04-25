import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from 'react-bootstrap';

// Inner form components for each onboarding step

/**
 * Personal Information Form
 * Props:
 *  - data: object containing firstName, lastName, email, phone
 *  - onChange: (field, value) => void
 *  - errors: object with validation messages keyed by field name
 */
const PersonalInfoForm = ({ data = {}, onChange, errors = {} }) => (
  <Form>
    <Form.Group className="mb-3" controlId="firstName">
      <Form.Label>First Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter first name"
        value={data.firstName || ''}
        isInvalid={!!errors.firstName}
        onChange={e => onChange('firstName', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="lastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter last name"
        value={data.lastName || ''}
        isInvalid={!!errors.lastName}
        onChange={e => onChange('lastName', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={data.email || ''}
        isInvalid={!!errors.email}
        onChange={e => onChange('email', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="phone">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control
        type="tel"
        placeholder="Enter phone number"
        value={data.phone || ''}
        isInvalid={!!errors.phone}
        onChange={e => onChange('phone', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
    </Form.Group>
  </Form>
);

/**
 * Job Details Form
 * Props:
 *  - data: object containing position, department, startDate, employmentType
 *  - onChange: (field, value) => void
 *  - errors: object with validation messages keyed by field name
 */
const JobDetailsForm = ({ data = {}, onChange, errors = {} }) => (
  <Form>
    <Form.Group className="mb-3" controlId="position">
      <Form.Label>Position</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter position"
        value={data.position || ''}
        isInvalid={!!errors.position}
        onChange={e => onChange('position', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="department">
      <Form.Label>Department</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter department"
        value={data.department || ''}
        isInvalid={!!errors.department}
        onChange={e => onChange('department', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="startDate">
      <Form.Label>Start Date</Form.Label>
      <Form.Control
        type="date"
        value={data.startDate || ''}
        isInvalid={!!errors.startDate}
        onChange={e => onChange('startDate', e.target.value)}
      />
      <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="employmentType">
      <Form.Label>Employment Type</Form.Label>
      <Form.Select
        value={data.employmentType || ''}
        isInvalid={!!errors.employmentType}
        onChange={e => onChange('employmentType', e.target.value)}
      >
        <option value="">Select type</option>
        <option value="full-time">Full‑time</option>
        <option value="part-time">Part‑time</option>
        <option value="contractor">Contractor</option>
        <option value="intern">Intern</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{errors.employmentType}</Form.Control.Feedback>
    </Form.Group>
  </Form>
);

/**
 * Documents Form – handles file uploads for ID proof and resume.
 * Props:
 *  - data: object containing idProof (File) and resume (File)
 *  - onChange: (field, file) => void
 *  - errors: object with validation messages keyed by field name
 */
const DocumentsForm = ({ data = {}, onChange, errors = {} }) => (
  <Form>
    <Form.Group className="mb-3" controlId="idProof">
      <Form.Label>ID Proof</Form.Label>
      <Form.Control
        type="file"
        onChange={e => onChange('idProof', e.target.files[0])}
        isInvalid={!!errors.idProof}
      />
      <Form.Control.Feedback type="invalid">{errors.idProof}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" controlId="resume">
      <Form.Label>Resume</Form.Label>
      <Form.Control
        type="file"
        onChange={e => onChange('resume', e.target.files[0])}
        isInvalid={!!errors.resume}
      />
      <Form.Control.Feedback type="invalid">{errors.resume}</Form.Control.Feedback>
    </Form.Group>
  </Form>
);

// Onboarding component skeleton
export const Onboarding = () => {
  // Total number of steps in the onboarding process
  const totalSteps = 3;

  // State variables
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    jobDetails: {},
    documents: {}
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect placeholder (e.g., for side‑effects when step changes)
  useEffect(() => {
    // TODO: Add any side‑effects needed when currentStep changes
  }, [currentStep]);

  // Helper: safely change step ensuring bounds
  const handleStepChange = (stepNumber) => {
    const step = Math.max(1, Math.min(stepNumber, totalSteps));
    setCurrentStep(step);
  };

  // Navigate to previous step
  const goToPrev = () => {
    handleStepChange(currentStep - 1);
  };

  // Generic field change handler that preserves immutability
  const handleFieldChange = (section, field, value) => {
    // Update the nested formData[section][field] without mutating existing state
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // If there is an existing error for this field, clear it
    setErrors(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: undefined
      }
    }));
  };

  // Generic data updater for a given section (personalInfo, jobDetails, documents)
  const updateSectionData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear field‑specific error if present
    setErrors(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: undefined
      }
    }));
  };

  // Fallback validation – always true. Real validation will be injected later.
  const fallbackValidateStep = async () => true;

  // Navigate to next step – validates current step before proceeding
  const goToNext = async () => {
    // If a validation function is provided elsewhere, use it.
    // Expected signature: validateStep(stepNumber, formData) => boolean|Promise<boolean>
    // const validator = typeof validateStep === 'function' ? validateStep : fallbackValidateStep;
    // const isValid = await validator(currentStep, formData);
    // if (!isValid) {
    //   // Validation failed – keep on the same step. Errors handling can be added later.
    //   return;
    // }
    handleStepChange(currentStep + 1);
  };

  // Final submission handler (placeholder)
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Placeholder: actual submission logic will be implemented in later tasks.
    // For now we simply reset the submitting flag after a short timeout.
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  // Render progress as a percentage
  const progressPercent = (currentStep / totalSteps) * 100;

  // Determine which form component to render based on the current step
  let stepComponent = null;
  if (currentStep === 1) {
    stepComponent = (
      <PersonalInfoForm
        data={formData.personalInfo}
        errors={errors.personalInfo || {}}
        onChange={(field, value) => handleFieldChange('personalInfo', field, value)}
      />
    );
  } else if (currentStep === 2) {
    stepComponent = (
      <JobDetailsForm
        data={formData.jobDetails}
        errors={errors.jobDetails || {}}
       onChange={(field, value) => handleFieldChange('jobDetails', field, value)}
      />
    );
  } else if (currentStep === 3) {
    stepComponent = (
      <DocumentsForm
        data={formData.documents}
        errors={errors.documents || {}}
       onChange={(field, value) => handleFieldChange('documents', field, value)}
      />
    );
  }

  return (
    <Container className="my-4">
      <ProgressBar now={progressPercent} label={`Step ${currentStep} of ${totalSteps}`} className="mb-4" />
      {/* Step‑specific form */}
      {stepComponent}

      {/* Navigation Buttons */}
      <Row className="mt-3">
        <Col>
          <Button variant="secondary" onClick={goToPrev} disabled={currentStep === 1}>
            Previous
          </Button>
        </Col>
        <Col className="text-end">
          {currentStep === totalSteps ? (
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button variant="primary" onClick={goToNext}>
              Next
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Onboarding;
