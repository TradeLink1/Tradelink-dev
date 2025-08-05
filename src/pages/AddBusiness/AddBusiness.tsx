import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
// import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { FileUpload } from "./FileUpload";
import { useFormValidation } from "./hooks/useFormValidation";
import {
  Upload,
  Store,
  User,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  Camera,
} from "lucide-react";

interface FormData {
  // Business Information
  businessName: string;
  businessType: string;
  category: string;
  description: string;

  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Business Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Additional Information
  website: string;
  taxId: string;
  businessHours: string;

  // File uploads
  logo: File[];
  businessLicense: File[];
  taxDocument: File[];

  // Agreements
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

const businessCategories: string[] = [
  "Electronics & Technology",
  "Fashion & Apparel",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
  "Books & Media",
  "Food & Beverages",
  "Automotive",
  "Arts & Crafts",
  "Services",
  "Travel & Hospitality",
  "Real Estate",
  "Education & Training",
  "Finance & Insurance",
  "Entertainment & Events",
  "Other",
];

const businessTypes: string[] = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "Corporation",
  "Non-Profit",
  "Freelancer",
  "E-commerce",
  "Retail",
  "Wholesale",
  "Service Provider",
  "Consultant",
  "Distributor",
  "Manufacturer",
];

const validationRules: Record<
  keyof FormData,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  }
> = {
  businessName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: "Business name is required and must be 2-100 characters",
  },
  businessType: {
    required: true,
    message: "Please select a business type",
  },
  category: {
    required: true,
    message: "Please select a business category",
  },
  description: {
    required: true,
    minLength: 20,
    maxLength: 500,
    message: "Business description is required and must be 20-500 characters",
  },
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: "First name is required and must be 2-50 characters",
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: "Last name is required and must be 2-50 characters",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  phone: {
    required: true,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: "Please enter a valid phone number",
  },
  address: {
    required: true,
    minLength: 5,
    message: "Street address is required and must be at least 5 characters",
  },
  city: {
    required: true,
    minLength: 2,
    message: "City is required",
  },
  state: {
    required: true,
    minLength: 2,
    message: "State/Province is required",
  },
  zipCode: {
    required: true,
    pattern: /^[0-9]{5}(-[0-9]{4})?$|^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/,
    message: "Please enter a valid ZIP/Postal code",
  },
  country: {
    required: true,
    message: "Country is required",
  },
  website: {
    pattern: /^https?:\/\/.+/,
    message: "Website must start with http:// or https://",
  },
  agreeToTerms: {
    required: true,
    message: "You must agree to the Terms of Service",
  },
  agreeToPrivacy: {
    required: true,
    message: "You must agree to the Privacy Policy",
  },
};

export function AddBusiness() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData: FormData = {
    businessName: "",
    businessType: "",
    category: "",
    description: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    website: "",
    taxId: "",
    businessHours: "",
    logo: [],
    businessLicense: [],
    taxDocument: [],
    agreeToTerms: false,
    agreeToPrivacy: false,
  };

  const {
    data,
    errors,
    touched,
    updateField,
    touchField,
    validateAll,
    isValid,
  } = useFormValidation<FormData>(initialFormData, validationRules);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const validateCurrentStep = (): boolean => {
    let stepFields: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        stepFields = [
          "businessName",
          "businessType",
          "category",
          "description",
        ];
        break;
      case 2:
        stepFields = ["firstName", "lastName", "email", "phone"];
        break;
      case 3:
        stepFields = ["address", "city", "state", "zipCode", "country"];
        break;
      case 4:
        return true; // File upload step - optional files
      case 5:
        stepFields = ["agreeToTerms", "agreeToPrivacy"];
        break;
    }

    let isValid = true;
    stepFields.forEach((field) => {
      touchField(field as string);
      if (errors[field as string]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateAll()) {
      setSubmitError("Please fix all validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      console.log("Form submitted:", data);
      alert(
        "Registration submitted successfully! You will receive an email confirmation shortly."
      );
    } catch (error) {
      setSubmitError(
        "There was an error submitting your registration. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-marketplace-primary rounded-full">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3>Business Information</h3>
                <p className="text-muted-foreground">
                  Tell us about your business
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={data.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  onBlur={() => touchField("businessName")}
                  placeholder="Enter your business name"
                  className={errors.businessName ? "border-red-500" : ""}
                />
                {errors.businessName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.businessName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={data.businessType}
                  onValueChange={(value) => updateField("businessType", value)}
                >
                  <SelectTrigger
                    className={errors.businessType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.businessType}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="category">Business Category *</Label>
                <Select
                  value={data.category}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select your business category" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  onBlur={() => touchField("description")}
                  placeholder="Describe your business and what you sell... (minimum 20 characters)"
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                <div className="flex justify-between items-center">
                  <div>
                    {errors.description && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {data.description.length}/500
                  </p>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={data.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  onBlur={() => touchField("website")}
                  placeholder="https://www.yourbusiness.com"
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.website}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-marketplace-orange rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3>Contact Information</h3>
                <p className="text-muted-foreground">
                  Your personal contact details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={data.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  onBlur={() => touchField("firstName")}
                  placeholder="Enter your first name"
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={data.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  onBlur={() => touchField("lastName")}
                  placeholder="Enter your last name"
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => touchField("email")}
                  placeholder="your.email@example.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => touchField("phone")}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="taxId">Tax ID / EIN (Optional)</Label>
                <Input
                  id="taxId"
                  value={data.taxId}
                  onChange={(e) => updateField("taxId", e.target.value)}
                  placeholder="Enter your Tax ID or EIN"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-marketplace-green rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3>Business Address</h3>
                <p className="text-muted-foreground">
                  Where is your business located?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={data.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  onBlur={() => touchField("address")}
                  placeholder="123 Business Street"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={data.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  onBlur={() => touchField("city")}
                  placeholder="Enter city"
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={data.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  onBlur={() => touchField("state")}
                  placeholder="Enter state or province"
                  className={errors.state ? "border-red-500" : ""}
                />
                {errors.state && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.state}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                <Input
                  id="zipCode"
                  value={data.zipCode}
                  onChange={(e) => updateField("zipCode", e.target.value)}
                  onBlur={() => touchField("zipCode")}
                  placeholder="12345"
                  className={errors.zipCode ? "border-red-500" : ""}
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.zipCode}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={data.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  onBlur={() => touchField("country")}
                  placeholder="United States"
                  className={errors.country ? "border-red-500" : ""}
                />
                {errors.country && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="businessHours">Business Hours (Optional)</Label>
                <Textarea
                  id="businessHours"
                  value={data.businessHours}
                  onChange={(e) => updateField("businessHours", e.target.value)}
                  placeholder="Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-marketplace-orange rounded-full">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3>Business Documents</h3>
                <p className="text-muted-foreground">
                  Upload your business logo and documents
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <FileUpload
                label="Business Logo"
                accept="image/*"
                maxSize={5}
                files={data.logo}
                onFilesChange={(files) => updateField("logo", files)}
                description="Upload your business logo (JPG, PNG, SVG - max 5MB)"
              />

              <FileUpload
                label="Business License (Optional)"
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={10}
                files={data.businessLicense}
                onFilesChange={(files) => updateField("businessLicense", files)}
                description="Upload your business license or registration document (PDF, JPG, PNG - max 10MB)"
              />

              <FileUpload
                label="Tax Document (Optional)"
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={10}
                files={data.taxDocument}
                onFilesChange={(files) => updateField("taxDocument", files)}
                description="Upload your tax ID document or EIN letter (PDF, JPG, PNG - max 10MB)"
              />

              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  All uploaded documents will be reviewed by our team. Please
                  ensure all documents are clear and legible. Your information
                  will be kept confidential and used only for verification
                  purposes.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-marketplace-green rounded-full">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3>Review & Submit</h3>
                <p className="text-muted-foreground">
                  Please review your information and agree to the terms
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Business Information</h4>
                  <p>Business Name: {data.businessName || "N/A"}</p>
                  <p>Business Type: {data.businessType || "N/A"}</p>
                  <p>Category: {data.category || "N/A"}</p>
                  <p>Description: {data.description || "N/A"}</p>
                  <p>Website: {data.website || "N/A"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Contact Information</h4>
                  <p>
                    Full Name: {data.firstName} {data.lastName || "N/A"}
                  </p>
                  <p>Email: {data.email || "N/A"}</p>
                  <p>Phone: {data.phone || "N/A"}</p>
                  <p>Tax ID: {data.taxId || "N/A"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Business Address</h4>
                  <p>Address: {data.address || "N/A"}</p>
                  <p>City: {data.city || "N/A"}</p>
                  <p>State: {data.state || "N/A"}</p>
                  <p>ZIP Code: {data.zipCode || "N/A"}</p>
                  <p>Country: {data.country || "N/A"}</p>
                  <p>Business Hours: {data.businessHours || "N/A"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Documents</h4>
                  <p>
                    Logo:{" "}
                    {data.logo.length > 0
                      ? `${data.logo.length} file(s)`
                      : "Not uploaded"}
                  </p>
                  <p>
                    License:{" "}
                    {data.businessLicense.length > 0
                      ? `${data.businessLicense.length} file(s)`
                      : "Not uploaded"}
                  </p>
                  <p>
                    Tax Document:{" "}
                    {data.taxDocument.length > 0
                      ? `${data.taxDocument.length} file(s)`
                      : "Not uploaded"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={data.agreeToTerms}
                    onCheckedChange={(checked) =>
                      updateField("agreeToTerms", checked)
                    }
                    onBlur={() => touchField("agreeToTerms")}
                  />
                  <Label htmlFor="agreeToTerms" className="cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-marketplace-primary underline">
                      Terms of Service
                    </a>
                  </Label>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={data.agreeToPrivacy}
                    onCheckedChange={(checked) =>
                      updateField("agreeToPrivacy", checked)
                    }
                    onBlur={() => touchField("agreeToPrivacy")}
                  />
                  <Label htmlFor="agreeToPrivacy" className="cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-marketplace-primary underline">
                      Privacy Policy
                    </a>
                  </Label>
                  {errors.agreeToPrivacy && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.agreeToPrivacy}
                    </p>
                  )}
                </div>
              </div>

              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Register Your Business</CardTitle>
          <Progress value={progress} className="w-1/3" />
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          <div className="mt-6 flex justify-between">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button onClick={nextStep} disabled={!validateCurrentStep()}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AddBusiness;
