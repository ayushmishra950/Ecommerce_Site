import { useState } from 'react';
import { Save, Lock, Bell, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminSettings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'My E-Commerce Store',
    storeEmail: 'admin@store.com',
    currency: 'USD',
  });

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@store.com',
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newCustomers: true,
    lowStock: false,
  });

  return (
    <div className="space-y-6">
      {/* Store Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Store className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Store Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-xl">
          <div className="space-y-1">
            <Label>Store Name</Label>
            <Input
              value={storeSettings.storeName}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, storeName: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Store Email</Label>
            <Input
              type="email"
              value={storeSettings.storeEmail}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, storeEmail: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Currency</Label>
            <Input
              value={storeSettings.currency}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, currency: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-xl">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-xl">
          <div className="flex items-center justify-between">
            <Label>Two-Factor Authentication</Label>
            <Switch
              checked={security.twoFactorAuth}
              onCheckedChange={(value) =>
                setSecurity({ ...security, twoFactorAuth: value })
              }
            />
          </div>

          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-xl">
          <div className="flex items-center justify-between">
            <Label>Order Updates</Label>
            <Switch
              checked={notifications.orderUpdates}
              onCheckedChange={(value) =>
                setNotifications({ ...notifications, orderUpdates: value })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>New Customers</Label>
            <Switch
              checked={notifications.newCustomers}
              onCheckedChange={(value) =>
                setNotifications({ ...notifications, newCustomers: value })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Low Stock Alerts</Label>
            <Switch
              checked={notifications.lowStock}
              onCheckedChange={(value) =>
                setNotifications({ ...notifications, lowStock: value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
