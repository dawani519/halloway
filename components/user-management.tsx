"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UserManagement() {
  const supabase = createClientComponentClient();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "customer" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        console.error("❌ Error fetching users:", error);
        toast.error("Failed to load users.");
      } else {
        setUsers(
          data.users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || "No Name",
            role: user.user_metadata?.role || "customer", // Default role
          }))
        );
      }
      setLoading(false);
    }

    fetchUsers();
  }, [supabase]);

  const handleDeleteUser = async (userId: string) => {
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error("❌ Error deleting user:", error);
      toast.error("Failed to delete user.");
      return;
    }

    toast.success("User deleted successfully.");
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.name) {
      toast.error("Please enter both name and email.");
      return;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: newUser.email,
      user_metadata: {
        full_name: newUser.name,
        role: newUser.role,
      },
    });

    if (error) {
      console.error("❌ Error adding user:", error);
      toast.error(error.message);
      return;
    }

    toast.success("User added successfully.");
    setUsers([...users, { id: data.user?.id, ...newUser }]);
    setIsAddingUser(false);
    setNewUser({ email: "", name: "", role: "customer" });
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole },
    });

    if (error) {
      console.error("❌ Error updating role:", error);
      toast.error("Failed to update role.");
      return;
    }

    toast.success("User role updated successfully.");
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
    setIsEditing(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddingUser(true)}>Add User</Button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => { setSelectedUser(user); setIsEditing(true); }}>Edit Role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Add User Dialog */}
      <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <Input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <Input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <DialogFooter>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      {selectedUser && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
            </DialogHeader>
            <Select onValueChange={(value) => handleUpdateRole(selectedUser.id, value)}>
              <SelectTrigger><SelectValue placeholder={selectedUser.role} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
