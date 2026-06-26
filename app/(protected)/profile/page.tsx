'use client';

import Image from 'next/image';
import { usePetStore } from '@/store/usePetStore';
import { ChangeEvent, useMemo, useState, useSyncExternalStore } from 'react';

type ProfileData = {
  name: string;
  email: string;
  age: string;
  mobile: string;
  habits: string;
  bio: string;
  profileImage: string;
};

const PROFILE_STORAGE_KEY = 'user-profile';

const createDefaultProfile = (name: string): ProfileData => ({
  name,
  email: '',
  age: '',
  mobile: '',
  habits: '',
  bio: '',
  profileImage: '',
});

const Profile = () => {
  const { pet, updateName } = usePetStore();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(createDefaultProfile(pet.name));

  const isClient = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  const storedProfile = useSyncExternalStore(
    (onStoreChange) => {
      if (!isClient || typeof window === 'undefined') {
        return () => undefined;
      }

      const handler = () => onStoreChange();
      window.addEventListener('storage', handler);
      window.addEventListener('profile-storage-updated', handler);
      return () => {
        window.removeEventListener('storage', handler);
        window.removeEventListener('profile-storage-updated', handler);
      };
    },
    () => {
      if (typeof window === 'undefined') return '';
      return localStorage.getItem(PROFILE_STORAGE_KEY) ?? '';
    },
    () => ''
  );

  const profile = useMemo(() => {
    const defaultProfile = createDefaultProfile(pet.name);

    if (!isClient || !storedProfile) return defaultProfile;

    try {
      const parsedProfile = JSON.parse(storedProfile) as Partial<ProfileData>;
      return { ...defaultProfile, ...parsedProfile };
    } catch {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
      return defaultProfile;
    }
  }, [isClient, pet.name, storedProfile]);

  if (!isClient) return null;

  const activeProfile = isEditing ? draft : profile;

  const handleInputChange =
    (field: keyof ProfileData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft((currentDraft) => ({
        ...currentDraft,
        [field]: event.target.value,
      }));
    };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageSource = typeof fileReader.result === 'string' ? fileReader.result : '';
      setDraft((currentDraft) => ({ ...currentDraft, profileImage: imageSource }));
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleSave = () => {
    const finalizedProfile = {
      ...draft,
      name: draft.name.trim() || pet.name,
      email: draft.email.trim(),
      age: draft.age.trim(),
      mobile: draft.mobile.trim(),
      habits: draft.habits.trim(),
      bio: draft.bio.trim(),
    };

    setDraft(finalizedProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(finalizedProfile));
    window.dispatchEvent(new Event('profile-storage-updated'));
    updateName(finalizedProfile.name);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const initials = activeProfile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';

  return (
    <main className="min-h-screen bg-gray-500/10 p-6">
      <div className="mx-auto max-w-full space-y-6">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl px-4 font-bold text-slate-800">Profile</h1>
            {!isEditing ? (
              <button
                type="button"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                onClick={() => {
                  setDraft(profile);
                  setIsEditing(true);
                }}
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div className="grid gap-8 md:grid-cols-[220px_1fr]">
            <div className="space-y-4">
              <div className="flex justify-center">
                {activeProfile.profileImage ? (
                  <Image
                    src={activeProfile.profileImage}
                    alt="Profile"
                    className="h-44 w-44 rounded-full border border-slate-200 object-cover"
                    width={176}
                    height={176}
                    unoptimized
                  />
                ) : (
                  <div className="flex h-44 w-44 items-center justify-center rounded-full bg-slate-200 text-4xl font-bold text-slate-600">
                    {initials}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="block cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Set Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      value={draft.name}
                      onChange={handleInputChange("name")}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                      {profile.name || "-"}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">
                    Email ID
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={draft.email}
                      onChange={handleInputChange("email")}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="name@example.com"
                    />
                  ) : (
                    <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                      {profile.email || "-"}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      min={0}
                      value={draft.age}
                      onChange={handleInputChange("age")}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="Enter age"
                    />
                  ) : (
                    <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                      {profile.age || "-"}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">
                    Mobile Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={draft.mobile}
                      onChange={handleInputChange("mobile")}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      placeholder="+91 9876543210"
                    />
                  ) : (
                    <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                      {profile.mobile || "-"}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600">
                  Habits
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={draft.habits}
                    onChange={handleInputChange("habits")}
                    className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="Reading, Walking, Journaling..."
                  />
                ) : (
                  <p className="min-h-20 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                    {profile.habits || "-"}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-600">
                  Bio (optional)
                </label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={draft.bio}
                    onChange={handleInputChange("bio")}
                    className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    placeholder="Tell us something about yourself..."
                  />
                ) : (
                  <p className="min-h-24 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-800">
                    {profile.bio || "-"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;