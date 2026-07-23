import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Camera, ShieldCheck, KeyRound, UserRound } from "lucide-react";
import Card, { CardBody } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { PageLoader } from "../../components/ui/Spinner";
import {
  useProfile,
  useUpdateProfile,
  useUpdatePassword,
  useUpdateAvatar,
} from "../../features/user/user.hooks";
import {
  updateProfileSchema,
  updatePasswordSchema,
} from "../../features/user/user.schema";
import { zodResolver } from "../../utils/zodResolver";
import { getFileUrl, formatDate } from "../../utils/format";

const ProfilePage = () => {
  const { data, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();
  const updateAvatarMutation = useUpdateAvatar();
  const fileInputRef = useRef(null);

  const profile = data?.data;

  const profileForm = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  const passwordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  useEffect(() => {
    if (profile) {
      profileForm.reset({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const onSubmitProfile = (values) => {
    updateProfileMutation.mutate(values, {
      onSuccess: () => toast.success("Profil berhasil diperbarui"),
      onError: (err) =>
        toast.error(err.response?.data?.message || "Gagal memperbarui profil"),
    });
  };

  const onSubmitPassword = (values) => {
    updatePasswordMutation.mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password berhasil diubah");
          passwordForm.reset();
        },
        onError: (err) =>
          toast.error(err.response?.data?.message || "Gagal mengubah password"),
      }
    );
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    updateAvatarMutation.mutate(formData, {
      onSuccess: () => toast.success("Avatar berhasil diperbarui"),
      onError: (err) =>
        toast.error(err.response?.data?.message || "Gagal mengunggah avatar"),
    });
  };

  if (isLoading) return <PageLoader label="Memuat profil..." />;

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
          <div className="relative">
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-gold-100 text-2xl font-semibold text-gold-600">
              {profile?.avatar ? (
                <img
                  src={getFileUrl(profile.avatar)}
                  alt={profile.fullName}
                  className="size-full object-cover"
                />
              ) : (
                profile?.fullName?.[0]?.toUpperCase() || "U"
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-gold-500 text-ink-950 hover:bg-gold-400"
              disabled={updateAvatarMutation.isPending}
            >
              <Camera className="size-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-ink-950">
              {profile?.fullName}
            </p>
            <p className="text-sm text-ink-600">{profile?.email}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge variant="gold">{profile?.role}</Badge>
              {profile?.isVerified ? (
                <Badge variant="profit">
                  <ShieldCheck className="size-3" />
                  Terverifikasi
                </Badge>
              ) : (
                <Badge variant="pending">Belum Verifikasi</Badge>
              )}
              <span className="text-xs text-ink-600">
                Bergabung {formatDate(profile?.createdAt)}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="size-4 text-gold-600" />
              <p className="font-display text-base font-semibold text-ink-950">
                Informasi Profil
              </p>
            </div>
            <form
              onSubmit={profileForm.handleSubmit(onSubmitProfile)}
              className="space-y-4"
            >
              <Input
                label="Nama lengkap"
                error={profileForm.formState.errors.fullName?.message}
                {...profileForm.register("fullName")}
              />
              <Input
                label="Nomor telepon"
                placeholder="08xxxxxxxxxx"
                error={profileForm.formState.errors.phone?.message}
                {...profileForm.register("phone")}
              />
              <Button
                type="submit"
                variant="gold"
                isLoading={updateProfileMutation.isPending}
              >
                Simpan Perubahan
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="mb-4 flex items-center gap-2">
              <KeyRound className="size-4 text-gold-600" />
              <p className="font-display text-base font-semibold text-ink-950">
                Ubah Password
              </p>
            </div>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
              className="space-y-4"
            >
              <Input
                label="Password saat ini"
                type="password"
                error={passwordForm.formState.errors.currentPassword?.message}
                {...passwordForm.register("currentPassword")}
              />
              <Input
                label="Password baru"
                type="password"
                error={passwordForm.formState.errors.newPassword?.message}
                {...passwordForm.register("newPassword")}
              />
              <Input
                label="Konfirmasi password baru"
                type="password"
                error={
                  passwordForm.formState.errors.confirmNewPassword?.message
                }
                {...passwordForm.register("confirmNewPassword")}
              />
              <Button
                type="submit"
                variant="outline"
                isLoading={updatePasswordMutation.isPending}
              >
                Ubah Password
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
