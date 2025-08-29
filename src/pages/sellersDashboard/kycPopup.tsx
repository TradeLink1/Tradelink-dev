import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";

const KycPopup = ({ onVerify }: { onVerify: () => void }) => {
  const [idNumber, setIdNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = () => {
    if (!idNumber || !file) {
      alert("Please provide both ID number and document");
      return;
    }
    console.log("Submitting:", { idNumber, file });
    onVerify();
  };

  return (
    <div
      id="kycbg"
      className="fixed inset-0 bg-[#181818d6] backdrop-blur-sm flex justify-center items-center z-50 px-4"
    >
      <div className="bg-white backdrop-blur-xl p-6 max-mobile:max-w-[350px] rounded-[30px] shadow-2xl w-full max-w-md border border-gray-200 animate-fadeIn">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-center text-[#f89216]">
          KYC Verification
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Please provide your ID details to verify your account
        </p>

        {/* ID Number */}
        <div className="mb-4">
          <label className="block font-medium mb-2 text-[#333333]">
            ID Number
          </label>
          <input
            type="text"
            placeholder="Enter your NIN, Passport No, etc."
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="w-full border border-gray-300 focus:border-[#f89216] focus:ring-2 focus:ring-[#f89216]/40 p-3 rounded-lg outline-none transition"
          />
        </div>

        {/* Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-[#333333]">
            Upload ID Document
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#f89216] transition">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <FiUpload size={24} className="mb-2" />
              <span className="text-sm">
                {file ? file.name : "Click to upload or drag & drop"}
              </span>
              <span className="text-xs text-gray-400">(PNG, JPG, or PDF)</span>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#30ac57] px-20 rounded-full hover:bg-[#333333] text-white font-semibold py-3  shadow-md transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default KycPopup;
