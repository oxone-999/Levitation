import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

interface BasicDetailsFormData {
  name: string;
  email: string;
  phoneNumber: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

interface FileUploadFormData {
  files: File[];
  geolocationStatus: string;
}

interface MultiFieldSelectFormData {
  selectedOptions: string[];
}

interface FormData {
  basicDetails: BasicDetailsFormData;
  fileUpload: FileUploadFormData;
  multiSelect: MultiFieldSelectFormData;
}

const Home: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [geolocationStatus, setGeolocationStatus] =
    useState<string>("Not Captured");

  const watchFileUpload = watch("fileUpload", {
    files: [],
    geolocationStatus: "Not Captured",
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ["image/png", "application/pdf"],
    onDrop: (acceptedFiles) => {
      setValue("fileUpload.files", acceptedFiles);
      setGeolocationStatus("Captured");
    },
    multiple: true,
    maxFiles: 3,
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCancel = () => {
    console.log("Form canceled");
    // Additional logic for canceling the form if needed
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Additional logic for submitting the form
  };

  useEffect(() => {
    if (geolocationStatus === "Captured") {
      setValue("fileUpload.geolocationStatus", "Captured");
    }
  }, [geolocationStatus, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {currentStep === 1 && (
        <div>
          <h2>Step 1: Basic Details</h2>
          <label>
            User's Name:
            <input {...register("basicDetails.name", { required: true })} />
          </label>
          <label>
            Email:
            <input {...register("basicDetails.email", { required: true })} />
          </label>
          <label>
            Phone Number:
            <input
              {...register("basicDetails.phoneNumber", { required: true })}
            />
          </label>
          <label>
            Address Line 1:
            <input
              {...register("basicDetails.address.line1", { required: true })}
            />
          </label>
          <label>
            Address Line 2:
            <input {...register("basicDetails.address.line2")} />
          </label>
          <label>
            City:
            <input
              {...register("basicDetails.address.city", { required: true })}
            />
          </label>
          <label>
            State:
            <input
              {...register("basicDetails.address.state", { required: true })}
            />
          </label>
          <label>
            Pincode:
            <input
              {...register("basicDetails.address.pincode", { required: true })}
            />
          </label>
          <label>
            Country:
            <input
              {...register("basicDetails.address.country", { required: true })}
            />
          </label>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Step 2: Multi-File Upload</h2>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files</p>
          </div>
          {acceptedFiles.length > 0 && (
            <div>
              <p>Selected Files:</p>
              <ul>
                {acceptedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <p>Geolocation Status: {geolocationStatus}</p>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2>Step 3: Multi-Field Select Dropdown</h2>
          <label>
            Select Options (multiple):
            <select
              {...register("multiSelect.selectedOptions", { required: true })}
              multiple
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
        </div>
      )}

      <div>
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        {currentStep < 3 ? (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>

      <div>
        <progress value={currentStep} max={3} />
      </div>
    </form>
  );
};

export default Home;
