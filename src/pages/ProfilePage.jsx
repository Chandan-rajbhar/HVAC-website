import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Wrench,
  TrendingUp,
  LogOut,
  Mail,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  Calendar,
  UserCheck,
  HardHat,
  Headphones,
  LogIn,
  Pencil,
  Camera,
  Check,
  X,
  Cpu
} from 'lucide-react';
import { useAuth, ROLE_CONFIG } from '../context/AuthContext';
import { loadCompanionState, saveCompanionState } from '../lib/hvacSync';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const ROLE_META = {
  customer: {
    icon: User,
    badge: 'Homeowner / Buyer',
    description: 'Configure modular HVAC units, lock in $200 batch reservations, and manage your synced VIVID-400 system.',
    links: [
      { title: 'Reserve Your System', desc: 'Customize tonnage, airflow & finishes', path: '/buyers', icon: ShoppingCart },
      { title: 'My Reservations', desc: 'Pick an installation date & slot', path: '/reservations', icon: Calendar },
      { title: 'Manage Your Contractor', desc: 'View or switch your assigned technician', path: '/manage-contractor', icon: UserCheck },
      { title: 'My System', desc: 'View your purchased VIVID-400 system details', path: '/my-system', icon: Cpu },
    ],
  },
  contractor: {
    icon: Wrench,
    badge: 'Certified HVAC Contractor',
    description: 'Complete certification onboarding, view Local Mechanical compliance audits, and manage customer assignments.',
    links: [
      { title: 'Contractor Onboarding', desc: 'Docs, training video & 10-question exam', path: '/contractor', icon: HardHat },
      { title: 'Manage Contractor', desc: 'View ratings & assignment status', path: '/manage-contractor', icon: UserCheck },
      { title: 'Local Mechanical', desc: 'Compliance logs & quality audits', path: '/local-mechanical', icon: ShieldCheck },
      { title: 'Help & AI Support', desc: 'Instant answers & technical guidance', path: '/help', icon: Headphones },
    ],
  },
  investor: {
    icon: TrendingUp,
    badge: 'Investor / Partner',
    description: 'Explore No-Tech HVAC market growth, modular technology advantages, and corporate partnership opportunities.',
    links: [
      { title: 'Investor Hub', desc: 'Market metrics, pillars & investor deck', path: '/investor', icon: TrendingUp },
      { title: 'Help & AI Support', desc: 'Instant answers & technical guidance', path: '/help', icon: Headphones },
    ],
  },
};

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || null);

  useEffect(() => {
    if (user?.role === 'customer') {
      const current = loadCompanionState();
      if (current.customer?.name !== user.name || current.customer?.email !== user.email) {
        saveCompanionState({
          ...current,
          updatedAt: Date.now(),
          customer: { name: user.name, email: user.email },
        });
      }
    }
  }, [user?.name, user?.email, user?.role]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startEditing = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditAvatar(user?.avatar || null);
    setIsEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setEditAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) return;
    updateProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      avatar: editAvatar,
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-lg text-center">
          <CardContent className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#C2B59B] flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Sign in to view your Profile
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Access your Customer, Contractor, or Investor account details and portal shortcuts.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <Button asChild size="sm" className="h-9 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold">
                <Link to="/login">
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold">
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const roleInfo = ROLE_META[user.role] || ROLE_META.customer;
  const RoleIcon = roleInfo.icon;
  const displayedAvatar = isEditing ? editAvatar : user.avatar;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >

        {/* Main Account Profile Card */}
        <Card className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_6px_24px_rgba(0,0,0,0.04)] dark:shadow-2xl overflow-hidden py-0 gap-0">
          <CardHeader className="p-6 sm:p-8 bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border-b border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                {displayedAvatar ? (
                  <img
                    src={displayedAvatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#7E8056] shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#7E8056] text-white flex items-center justify-center shadow-md">
                    <RoleIcon className="w-7 h-7" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white capitalize">
                    {user.name}
                  </CardTitle>
                  <Badge className="bg-[#7E8056] hover:bg-[#7E8056] text-white border-0 text-[10px] font-semibold">
                    {ROLE_CONFIG[user.role]?.label || user.role}
                  </Badge>
                </div>
                <CardDescription className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#C2B59B]" />
                  <span>{user.email}</span>
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              {!isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={startEditing}
                  className="h-9 px-3.5 rounded-lg border-slate-300 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-xs cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  <span>Edit Profile</span>
                </Button>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="h-9 px-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:text-red-700 border-red-500/30 font-semibold text-xs cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                <span>Logout</span>
              </Button>
            </div>
          </CardHeader>

          {(isEditing || user.role !== 'customer') && (
          <CardContent className="p-6 sm:p-8 space-y-5">
            {isEditing && (
              <form
                onSubmit={handleSaveProfile}
                className="p-5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-[#7E8056]/30 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Edit Profile Details</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Upload a profile picture and update your account info.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 px-3 rounded-lg text-xs font-semibold border-[#7E8056]/40 text-[#7E8056] dark:text-[#C2B59B]"
                    >
                      <Camera className="w-3.5 h-3.5 mr-1.5" />
                      <span>{editAvatar ? 'Change Photo' : 'Upload Photo'}</span>
                    </Button>
                    {editAvatar && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditAvatar(null)}
                        className="h-8 px-2.5 rounded-lg text-xs text-red-600 dark:text-red-400"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-profile-name">Full Name</Label>
                    <Input
                      id="edit-profile-name"
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-9 bg-white dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="edit-profile-email">Email Address</Label>
                    <Input
                      id="edit-profile-email"
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="h-9 bg-white dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="h-8 px-3.5 rounded-lg text-xs"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Save Changes
                  </Button>
                </div>
              </form>
            )}

            {user.role !== 'customer' && (
            <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B] block">
                  Active Role Permissions
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{roleInfo.badge}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                  {roleInfo.description}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold"
              >
                <ShieldCheck className="w-3 h-3 mr-1" />
                Verified Session
              </Badge>
            </div>
            )}
          </CardContent>
          )}
        </Card>

        {/* Role-Specific Portal Shortcuts */}
        <div className="space-y-3">
          <h2 className="text-base font-bold font-serif text-slate-900 dark:text-white">
            Your {ROLE_CONFIG[user.role]?.label} Portal Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roleInfo.links.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <Link to={item.path} className="block group">
                    <Card className="rounded-xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] hover:border-[#7E8056]/60 dark:hover:border-[#A4A77E]/50 shadow-xs hover:shadow-md transition-all">
                      <CardContent className="p-4 flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/10 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7E8056] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7E8056] dark:group-hover:text-[#C2B59B] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#7E8056] dark:group-hover:text-[#C2B59B] transition-colors" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
