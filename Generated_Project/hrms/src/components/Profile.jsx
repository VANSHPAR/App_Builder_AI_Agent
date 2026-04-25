import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Helper validation function
function validateProfile(data) {
  const errors = {};
  // Required fields
  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'First name is required.';
  }
  if (!data.lastName || data.lastName.trim() === '') {
    errors.lastName = 'Last name is required.';
  }
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required.';
  } else {
    // Simple email regex
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email address.';
    }
  }
  // Phone number format (optional but if provided must be valid)
  if (data.phone && data.phone.trim() !== '') {
    const phoneRegex = /^\+?\d{7,15}$/; // allows optional + and 7-15 digits
    if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Invalid phone number.';
    }
  }
  return errors;
}

function Profile({ userId }) {
  // State variables
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    avatarUrl: '',
  });
  // Keep a copy of the original fetched profile for cancel/reset
  const [originalProfile, setOriginalProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Store selected avatar file for upload
  const [avatarFile, setAvatarFile] = useState(null);

  // Fetch profile data on mount / when userId changes
  useEffect(() => {
    // Guard against missing userId
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          // You may want to handle non‑200 responses differently
          console.error('Failed to fetch profile:', response.statusText);
          return;
        }
        const data = await response.json();
        const fetched = {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          position: data.position || '',
          avatarUrl: data.avatarUrl || '',
        };
        setProfile(fetched);
        setOriginalProfile(fetched); // store original for cancel
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [userId]);

  // Handler for input changes in edit mode
  const handleChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  // Handler for avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      // Update avatarUrl to preview; keep the actual file for upload
      setProfile({ ...profile, avatarUrl: previewUrl });
      setAvatarFile(file);
    }
  };

  // Save handler – includes validation and submission
  const handleSave = async () => {
    const validationErrors = validateProfile(profile);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      // Do not proceed with submit if validation fails
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('firstName', profile.firstName);
      formData.append('lastName', profile.lastName);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('position', profile.position);
      // Append avatar file only if a new one was selected
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch(`/api/users/${userId}`,
        {
          method: 'PUT',
          body: formData,
          // Do NOT set Content-Type; browser will set multipart/form-data with boundary
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        // Ensure the shape matches our profile state
        const updatedProfile = {
          firstName: updatedData.firstName || '',
          lastName: updatedData.lastName || '',
          email: updatedData.email || '',
          phone: updatedData.phone || '',
          position: updatedData.position || '',
          avatarUrl: updatedData.avatarUrl || '',
        };
        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
        setEditMode(false);
        setErrors({});
        setAvatarFile(null);
      } else {
        // Attempt to extract error messages from response
        let errorPayload = {};
        try {
          errorPayload = await response.json();
        } catch (_) {
          // ignore JSON parse errors
        }
        // Expected format: { errors: { field: 'msg' } } or { message: '...' }
        if (errorPayload.errors) {
          setErrors(errorPayload.errors);
        } else if (errorPayload.message) {
          setErrors({ server: errorPayload.message });
        } else {
          setErrors({ server: 'Failed to save profile.' });
        }
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setErrors({ server: err.message || 'Network error.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel handler – reset to original data
  const handleCancel = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setErrors({});
    setEditMode(false);
    setAvatarFile(null);
  };

  // Render read‑only profile view
  const renderReadOnly = () => (
    <Form>
      {/* Avatar */}
      <Row className="justify-content-center mb-4 text-center">
        <Col xs="auto" md={4} lg={3}>
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              roundedCircle
              className="img-fluid rounded-circle"
              alt="Avatar"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/150"
              roundedCircle
              className="img-fluid rounded-circle"
              alt="Avatar placeholder"
            />
          )}
        </Col>
      </Row>

      {/* Profile fields */}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control plaintext readOnly defaultValue={profile.firstName} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control plaintext readOnly defaultValue={profile.lastName} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control plaintext readOnly defaultValue={profile.email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control plaintext readOnly defaultValue={profile.phone} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="position">
        <Form.Label>Position</Form.Label>
        <Form.Control plaintext readOnly defaultValue={profile.position} />
      </Form.Group>

      {/* Edit button */}
      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </Col>
      </Row>
    </Form>
  );

  // Render edit mode UI with validation feedback
  const renderEditMode = () => (
    <Form noValidate>
      {/* Avatar preview and upload */}
      <Row className="justify-content-center mb-4 text-center">
        <Col xs="auto" md={4} lg={3}>
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              roundedCircle
              className="img-fluid rounded-circle"
              alt="Avatar preview"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/150"
              roundedCircle
              className="img-fluid rounded-circle"
              alt="Avatar placeholder"
            />
          )}
          <Form.Control
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={handleAvatarChange}
          />
        </Col>
      </Row>

      {/* Editable fields */}
      <Form.Group className="mb-3" controlId="firstNameEdit">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={profile.firstName}
          onChange={handleChange('firstName')}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastNameEdit">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          value={profile.lastName}
          onChange={handleChange('lastName')}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="emailEdit">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={profile.email}
          onChange={handleChange('email')}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneEdit">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          value={profile.phone}
          onChange={handleChange('phone')}
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="positionEdit">
        <Form.Label>Position</Form.Label>
        <Form.Control
          value={profile.position}
          onChange={handleChange('position')}
        />
      </Form.Group>

      {/* Server error display */}
      {errors.server && (
        <div className="text-danger mb-3" role="alert">
          {errors.server}
        </div>
      )}

      {/* Action buttons */}
      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Saving…
              </>
            ) : (
              'Save'
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );

  return <Container fluid>{editMode ? renderEditMode() : renderReadOnly()}</Container>;
}

Profile.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Profile;
