"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export function AddUser() {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.full_name || !formData.email || !formData.phone_number) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    // Insert user into Supabase
    const { error } = await supabase.from("Users").insert([formData]);

    if (error) {
      console.error("❌ Error adding user:", error);
      toast.error("Failed to add user.");
    } else {
      toast.success("User added successfully!");
      setFormData({ full_name: "", email: "", phone_number: "", role: "customer" });
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="phone_number"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add User"}
        </Button>
      </form>
    </div>
  );
}
