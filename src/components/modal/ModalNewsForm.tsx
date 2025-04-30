import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { updateRoleRequest } from "../../services/userService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import Select from "../form/Select";

interface CategoryData {
    action: string,
    reason: string
}

interface ModalCategoryFormProps {
    id: string;
    mutateData: () => void;
}

export default function ModalNewsForm({ id, mutateData }: ModalCategoryFormProps) {
    const { isOpen, openModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CategoryData>({
        defaultValues: {
            action: "",
            reason: ""
        }
    });

    const handleSave = async (data: CategoryData) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("action", data.action);
        formData.append("reason", data.reason);

        try {
            await updateRoleRequest(formData, id);
            mutateData();
            closeModal();
            toast.success("Request updated successfully");
        } catch (error) {
            closeModal();
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="w-full text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
            >
                <LuPencil className="size-5" />
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] max-h-[400px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Approve Request</h4>
                    </div>

                    <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
                        <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                            <div className="mt-7">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2">
                                        <Label>Action</Label>
                                        <Select
                                            options={[
                                                { value: "APPROVED", label: "Approved" },
                                                { value: "REJECTED", label: "Rejected" },
                                            ]}
                                            value={watch("action")}
                                            placeholder="Select Action"
                                            onChange={(val) => setValue("action", val as "APPROVED" | "REJECTED")}
                                        />
                                        {errors.action && <p className="text-sm text-red-500">{errors.action.message}</p>}
                                    </div>
                                    {/* Full Name */}
                                    <div className="col-span-2">
                                        <Label>Reason</Label>
                                        <Input {...register("reason")} value={watch("reason")} onChange={(e) => setValue("reason", e.target.value)} />
                                        {errors.reason && <p className="text-sm text-red-500">{errors.reason.message}</p>}
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
        </div>
    );
}