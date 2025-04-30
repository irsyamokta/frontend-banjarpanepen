import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { createCategory } from "../../services/categoryService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Plus } from "lucide-react";

interface CategoryData {
    name: string,
}

interface ModalCategoryFormProps {
    mutateData: () => void;
}

export default function ModalCategoryForm({ mutateData }: ModalCategoryFormProps) {
    const { isOpen, openModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CategoryData>({
        defaultValues: {
            name: ""
        }
    });

    const handleSave = async (data: CategoryData) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);

        try {
            await createCategory(formData);
            mutateData();
            closeModal();
            toast.success("Category created successfully");
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
        <div className="mb-4">
            <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
                <Plus className="size-5" />
                Add
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] max-h-[400px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Add Category</h4>
                    </div>

                    <form className="flex flex-col" onSubmit={handleSubmit(handleSave)}>
                        <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                            <div className="mt-7">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    {/* Full Name */}
                                    <div className="col-span-2">
                                        <Label>Catgeory Name</Label>
                                        <Input {...register("name")} value={watch("name")} onChange={(e) => setValue("name", e.target.value)} />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
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