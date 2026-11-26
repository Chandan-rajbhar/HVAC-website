import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Pencil,
  Camera,
  Check,
  X,
  Cpu,
  Briefcase,
} from 'lucide-react';
import { useAuth, ROLE_CONFIG } from '../../context/AuthContext';
import { saveCompanionState, loadCompanionState } from '../../lib/hvacSync';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';

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
      { title: 'Contractor Application', desc: 'Docs, training video & 10-question exam', path: '/contractor', icon: HardHat },
      { title: 'My Jobs', desc: 'View your assigned installations & reports', path: '/contractor/jobs', icon: Briefcase },
      { title: 'My Schedule', desc: 'Manage assigned shifts & dispatch slots', path: '/reservations', icon: Calendar },
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

export default function ProfileDrawer({ open, onClose }) {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || null);

  useEffect(() => {
    if (!open) {
      setIsEditing(false);
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open || !user) return null;

  const roleInfo = ROLE_META[user.role] || ROLE_META.customer;
  const RoleIcon = roleInfo.icon;
  const displayedAvatar = isEditing ? editAvatar : user.avatar;

  const handleLogout = () => {
    logout();
    onClose();
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
    const nextName = editName.trim();
    const nextEmail = editEmail.trim();
    updateProfile({
      name: nextName,
      email: nextEmail,
      avatar: editAvatar,
    });
    if (user.role === 'customer') {
      const current = loadCompanionState();
      saveCompanionState({
        ...current,
        updatedAt: Date.now(),
        customer: { name: nextName, email: nextEmail },
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Backdrop click closes drawer */}
      <div className="flex-1" onClick={onClose} />

      {/* Right-Side Drawer Panel */}
      <aside
        aria-label="User Profile Drawer"
        className="w-full max-w-md h-full bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 border-l border-slate-200/90 dark:border-white/10 shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Top Drawer Bar */}
        <div className="px-5 py-4 bg-white dark:bg-[#181A1D] border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between sticky top-0 z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B]">
            Account Dashboard
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Profile Drawer"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 flex-1">
          {/* Profile Summary Card */}
          <Card className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-sm overflow-hidden py-0 gap-0">
            <div className="p-5 bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border-b border-slate-200/80 dark:border-white/[0.08] space-y-4">
              <div className="flex items-center gap-3.5">
                {displayedAvatar ? (
                  <img
                    src={displayedAvatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#7E8056] shadow-sm flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-[#7E8056] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <RoleIcon className="w-6 h-6" />
                  </div>
                )}

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white capitalize truncate">
                      {user.name}
                    </h2>
                    <Badge className="bg-[#7E8056] hover:bg-[#7E8056] text-white border-0 text-[10px] font-semibold">
                      {ROLE_CONFIG[user.role]?.label || user.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#C2B59B] flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={startEditing}
                    className="flex-1 h-8 rounded-lg border-slate-300 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-xs cursor-pointer"
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
                  className="flex-1 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 font-semibold text-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>

            {isEditing && (
              <CardContent className="p-5 space-y-4">
                <form
                  onSubmit={handleSaveProfile}
                  className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-[#7E8056]/30 space-y-3.5"
                >
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80 dark:border-white/10">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Edit Profile</span>
                    <div className="flex items-center gap-1.5">
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
                        className="h-7 px-2.5 rounded-md text-[11px] font-semibold border-[#7E8056]/40 text-[#7E8056] dark:text-[#C2B59B]"
                      >
                        <Camera className="w-3 h-3 mr-1" />
                        <span>{editAvatar ? 'Change' : 'Photo'}</span>
                      </Button>
                      {editAvatar && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditAvatar(null)}
                          className="h-7 px-2 rounded-md text-[11px] text-red-600 dark:text-red-400"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <Label htmlFor="drawer-profile-name" className="text-xs">Full Name</Label>
                      <Input
                        id="drawer-profile-name"
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8 bg-white dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="drawer-profile-email" className="text-xs">Email Address</Label>
                      <Input
                        id="drawer-profile-email"
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="h-8 bg-white dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="h-7 px-3 rounded-md text-xs"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-7 px-3 rounded-md bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </Card>

          {/* Portal Links */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold font-serif text-slate-900 dark:text-white">
              Your {ROLE_CONFIG[user.role]?.label} Portal Pages
            </h3>
            <div className="space-y-2.5">
              {roleInfo.links.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block group"
                  >
                    <Card className="rounded-xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] hover:border-[#7E8056]/60 dark:hover:border-[#A4A77E]/50 shadow-xs hover:shadow-md transition-all py-0">
                      <CardContent className="p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/10 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7E8056] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7E8056] dark:group-hover:text-[#C2B59B] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#7E8056] dark:group-hover:text-[#C2B59B] transition-colors flex-shrink-0" />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
