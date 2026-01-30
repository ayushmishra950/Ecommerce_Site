import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Activity,
  Server,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/superadmin' },
  { icon: Users, label: 'Admin Management', path: '/superadmin/admins' },
  { icon: Shield, label: 'Roles & Permissions', path: '/superadmin/roles' },
  { icon: Activity, label: 'System Activity', path: '/superadmin/activity' },
  { icon: Server, label: 'Platform Settings', path: '/superadmin/platform' },
  { icon: FileText, label: 'Reports', path: '/superadmin/reports' },
];

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Deep purple/indigo theme for Super Admin */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
        style={{ background: 'linear-gradient(180deg, hsl(260 50% 15%) 0%, hsl(260 50% 10%) 100%)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border/30">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-accent">Super Admin</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-accent/70 hover:text-accent hover:bg-accent/10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-accent/60 hover:bg-accent/10 hover:text-accent'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border/30">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
            <Avatar className="h-9 w-9 ring-2 ring-accent/50">
              <AvatarFallback className="bg-accent text-accent-foreground">
                {user?.name?.charAt(0) || 'S'}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-accent truncate">{user?.name}</p>
                <p className="text-xs text-accent/60 truncate">Super Admin</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <Button
              variant="ghost"
              className="w-full mt-3 justify-start text-accent/60 hover:text-accent hover:bg-accent/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('flex-1 transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-20')}>
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold text-foreground">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-muted-foreground">System Administration</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                5
              </Badge>
            </Button>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
