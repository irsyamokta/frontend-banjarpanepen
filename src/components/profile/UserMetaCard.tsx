import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { updateProfileValidator } from "../../utils/validator/profileValidator";
import { updateProfileUser } from "../../services/userService";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import DatePicker from "../form/date-picker";
import Select from "../form/Select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Pencil } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("/images/user/user.png");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof updateProfileValidator>>({
    resolver: zodResolver(updateProfileValidator),
    defaultValues: {
      name: "",
      email: "",
      gender: user?.gender,
      birthDate: "",
    },
  });

  useEffect(() => {
    if (user) {
      const formattedBirthDate = formatDate(user.birthDate);
      reset({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        birthDate: formattedBirthDate,
      });
      if (user.imageUrl) {
        setImagePreview(user.imageUrl);
      }
    }
  }, [user, reset]);

  const handleSave = async (data: z.infer<typeof updateProfileValidator>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("birthDate", data.birthDate);
    if (imageFile) {
      formData.append("file", imageFile);
    }

    console.log("File yang dikirim:", imageFile);

    try {
      await updateProfileUser(formData);
      closeModal();
      toast.success("Profile updated successfully", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      closeModal();
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, { position: "top-center", autoClose: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src={imagePreview} alt="user" className="object-cover w-full h-full" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {watch("name")}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Edit Personal Information</h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">Update your details to keep your profile up-to-date.</p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Personal Information</h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  {/* Profile Picture */}
                  <div className="col-span-2">
                    <Label>Profile Picture</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>

                  {/* Full Name */}
                  <div className="col-span-2">
                    <Label>Full Name</Label>
                    <Input {...register("name")} value={watch("name")} onChange={(e) => setValue("name", e.target.value)} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="col-span-2">
                    <Label>Email Address</Label>
                    <Input {...register("email")} value={watch("email")} onChange={(e) => setValue("email", e.target.value)} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  {/* Gender */}
                  <div className="col-span-2">
                    <Label>Gender</Label>
                    <Select
                      options={[
                        { value: "MALE", label: "MALE" },
                        { value: "FEMALE", label: "FEMALE" },
                      ]}
                      value={watch("gender")}
                      placeholder="Select Gender"
                      onChange={(val) => setValue("gender", val as "MALE" | "FEMALE")}
                    />
                    {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
                  </div>

                  {/* Birth Date */}
                  <div className="col-span-2">
                    <Label>Birth Date</Label>
                    <DatePicker
                      id="birthdate"
                      mode="single"
                      placeholder="YYYY-MM-DD"
                      value={watch("birthDate")}
                      onChange={(date) => {
                        if (date) {
                          const formatted = new Date(date).toISOString().split("T")[0];
                          setValue("birthDate", formatted);
                        }
                      }}
                    />
                    {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate.message}</p>}
                  </div>

                  {/* Role */}
                  <div className="col-span-2">
                    <Label>Role</Label>
                    <Input value={user.role} disabled />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal} disabled={isLoading}>
                Close
              </Button>
              <Button size="sm" type="submit" variant="default" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                    Loading...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}