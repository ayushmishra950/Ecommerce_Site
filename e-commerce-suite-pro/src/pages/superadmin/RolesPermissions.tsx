import { useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Shield, Eye, ShoppingCart, Package, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const roles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    usersCount: 2,
    permissions: ['all'],
    isSystem: true,
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Manage products, orders, and customers',
    usersCount: 12,
    permissions: ['products', 'orders', 'customers', 'categories'],
    isSystem: true,
  },
  {
    id: 3,
    name: 'Order Manager',
    description: 'Manage and process orders only',
    usersCount: 5,
    permissions: ['orders', 'customers.view'],
    isSystem: false,
  },
  {
    id: 4,
    name: 'Content Editor',
    description: 'Manage product content and categories',
    usersCount: 3,
    permissions: ['products.edit', 'categories'],
    isSystem: false,
  },
];

const allPermissions = [
  { id: 'products', name: 'Products', icon: Package, actions: ['view', 'create', 'edit', 'delete'] },
  { id: 'orders', name: 'Orders', icon: ShoppingCart, actions: ['view', 'process', 'cancel'] },
  { id: 'customers', name: 'Customers', icon: Users, actions: ['view', 'edit', 'delete'] },
  { id: 'settings', name: 'Settings', icon: Settings, actions: ['view', 'edit'] },
];

const RolesPermissions = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Roles & Permissions</h2>
          <p className="text-sm text-muted-foreground">Manage access control for admin users</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" placeholder="Enter role name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDesc">Description</Label>
                <Input id="roleDesc" placeholder="Brief description of this role" />
              </div>
              
              <div className="space-y-4">
                <Label>Permissions</Label>
                {allPermissions.map((permission) => (
                  <Card key={permission.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <permission.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{permission.name}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {permission.actions.map((action) => (
                          <div key={action} className="flex items-center space-x-2">
                            <Checkbox id={`${permission.id}-${action}`} />
                            <label
                              htmlFor={`${permission.id}-${action}`}
                              className="text-sm capitalize text-muted-foreground cursor-pointer"
                            >
                              {action}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Role</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className={role.isSystem ? 'border-primary/30' : ''}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  {role.isSystem && (
                    <Badge variant="outline" className="text-xs">
                      System
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
              </div>
              {!role.isSystem && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {role.usersCount} users with this role
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.includes('all') ? (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Shield className="h-3 w-3 mr-1" />
                      All Permissions
                    </Badge>
                  ) : (
                    role.permissions.map((perm) => (
                      <Badge key={perm} variant="secondary">
                        {perm.replace('.', ' - ')}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPermissions.map((permission) => (
                  <tr key={permission.id} className="border-b border-border">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <permission.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{permission.name}</span>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={role.id} className="py-3 px-4 text-center">
                        {role.permissions.includes('all') || role.permissions.includes(permission.id) ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolesPermissions;
