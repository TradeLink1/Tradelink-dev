import React, { useState } from "react";

const UserSettings: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState("Adeoluwa Wummi");
  const [email, setEmail] = useState("adeoluwummi@gmail.com");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("123 Main St, New York, USA");
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // Normally call API here
    console.log({
      profilePic,
      fullName,
      email,
      password,
      address,
      orderUpdates,
      promotions,
    });
    alert("Your settings have been saved!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      <div className="flex items-center gap-4">
        <img
          src={profilePic || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <label className="cursor-pointer text-[#30AC57] hover:underline">
          Change Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Full Name</span>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Change Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-gray-600">Default Delivery Address</span>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          rows={2}
        />
      </label>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium">Notifications</h3>

        <div className="flex items-center justify-between">
          <span>Order Updates</span>
          <input
            type="checkbox"
            checked={orderUpdates}
            onChange={() => setOrderUpdates(!orderUpdates)}
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Promotions & Offers</span>
          <input
            type="checkbox"
            checked={promotions}
            onChange={() => setPromotions(!promotions)}
            className="h-5 w-5"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-[#30AC57] text-white px-4 py-2 rounded hover:bg-[#28994d] transition mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserSettings;
