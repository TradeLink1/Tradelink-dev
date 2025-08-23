import { useEffect, useState } from "react";

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

    // Later: send idNumber + file to backend
    console.log("Submitting:", { idNumber, file });
    onVerify();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-lg shadow-2xl w-96 border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-center text-[#f89216]">KYC Verification</h2>

        {/* ID Type */}
        <label className="block font-medium mb-2 text-[#333333]">ID Number</label>
        <input
          type="text"
          placeholder="Enter your NIN, Passport No, etc."
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          className="mb-4 w-full border-2 p-2 rounded outline-0 border-gray-400 "
        />

        {/* Upload */}
        <label className="block font-medium mb-2 text-[#333333]">Upload ID Document</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 block w-full border-2 border-gray-400 p-2 rounded outline-0 "
        />
    <div className="flex justify-center items-center">
        <button
          onClick={handleSubmit}
          className="bg-[#30ac57] cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded w-full transition"
        >
          Submit
        </button> </div>
      </div>
    </div>
  );
};

export default KycPopup;