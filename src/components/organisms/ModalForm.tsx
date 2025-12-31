'use client';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { startTransition, useEffect, useMemo, useState } from "react";
import { userSchema, type UserFormData } from "@/src/lib/validations/user.schema";
import ModalLayout from "../templates/ModalLayout";
import { useModalClose } from "@/src/context/UserModalContext";
import { estadoOptions, sectorOptions } from "@/src/lib/constants";

interface ModalFormProps {
  visible: boolean;
  mode: "crear" | "editar";
  initialValues?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  loading?: boolean;
}

const emptyForm: UserFormData = {
  id: "",
  nombre: "",
  sector: "",
  estado: "ACTIVO",
};

const ModalFormContent = ({
  mode,
  initialValues,
  onSubmit,
  loading
}: Omit<ModalFormProps, 'visible' | 'onHide'>) => {
  const handleClose = useModalClose(); 
  const [formData, setFormData] = useState<UserFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  // Se usa useMemo para envitar cambiar en cada render y que el effect se vuelva a ejecutar
  const initialFormData = useMemo(() => {
    return { ...emptyForm, ...(initialValues || {}) };
  }, [initialValues]);

  useEffect(() => {
    startTransition(() => {
      setFormData(initialFormData);
      setErrors({});
    });
  }, [initialFormData]);

  // Se usa useMemo para evitar recalcular el valor si no hay cambios e invalidar el buton para no enviar solicitudes innecesarias
  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  }, [formData, initialFormData]);

  // Se usa keyof para asegurar que el campo es válido
  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = userSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors({
          id: fieldErrors.id?.[0],
          nombre: fieldErrors.nombre?.[0],
          sector: fieldErrors.sector?.[0],
          estado: fieldErrors.estado?.[0],
        });
        return;
      }

      onSubmit(result.data);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    }
  };

  const label = loading
    ? mode === "crear"
      ? "Creando..."
      : "Guardando..."
    : mode === "crear"
      ? "Crear"
      : "Guardar cambios";

  const hasErrors = Object.values(errors).some(Boolean);
  const isDisabled = !hasChanges || loading || hasErrors;

  return (
    <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
        {/* id */}
        <div className="flex flex-col gap-1">
          <label htmlFor="id" className="text-gray-700 font-medium">
            ID
          </label>
          <InputText
            id="id"
            value={formData.id}
            className="w-full bg-gray-100"
            placeholder="Ingrese el ID del usuario"
            onChange={(e) => handleChange("id", e.target.value)}
            disabled={mode === "editar"}
          />
          {errors.id && (
            <small className="text-red-500">{errors.id}</small>
          )}
        </div>

        {/* nombre */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-gray-700 font-medium">
            Nombre <span className="text-red-500">*</span>
          </label>
          <InputText
            id="nombre"
            value={formData.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Ingrese el nombre del usuario"
            className={`w-full ${errors.nombre ? "p-invalid" : ""}`}
            disabled={loading}
          />
          {errors.nombre && (
            <small className="text-red-500">{errors.nombre}</small>
          )}
        </div>

        {/* sector */}
        <div className="flex flex-col gap-1">
          <label htmlFor="sector" className="text-gray-700 font-medium">
            Sector <span className="text-red-500">*</span>
          </label>
          <Dropdown
            id="sector"
            value={formData.sector}
            options={sectorOptions}
            onChange={(e) => handleChange("sector", e.value)}
            placeholder="Seleccione el sector"
            className={`w-full ${errors.sector ? "p-invalid" : ""}`}
            disabled={loading}
            optionLabel="label"
            optionValue="value"
          />
          {errors.sector && (
            <small className="text-red-500">{errors.sector}</small>
          )}
        </div>

        {/* estado */}
        <div className="flex flex-col gap-1">
          <label htmlFor="estado" className="text-gray-700 font-medium">
            Estado <span className="text-red-500">*</span>
          </label>
          <Dropdown
            id="estado"
            value={formData.estado}
            options={estadoOptions}
            onChange={(e) => handleChange("estado", e.value)}
            placeholder="Seleccione el estado"
            className={`w-full ${errors.estado ? "p-invalid" : ""}`}
            disabled={loading}
            optionLabel="label"
            optionValue="value"
          />
          {errors.estado && (
            <small className="text-red-500">{errors.estado}</small>
          )}
        </div>

        {/* footer del modal */}
        <div className="flex justify-center gap-3 mt-4">
          <Button
            icon="pi pi-check"
            label={label}
            type="submit"
            loading={loading}
            disabled={isDisabled}
          />
          <Button
            icon="pi pi-times"
            label="Cancelar"
            severity="secondary"
            outlined
            type="button"
            onClick={handleClose}
            disabled={loading}
          />
        </div>

    </form>
  );
};

const ModalForm = ({
  visible,
  mode,
  initialValues,
  onSubmit,
  loading
}: ModalFormProps) => {
  if (!visible) return null;

  return (
    <ModalLayout title={mode === "crear" ? "Crear usuario" : "Editar usuario"}>
      <ModalFormContent
        mode={mode}
        initialValues={initialValues}
        onSubmit={onSubmit}
        loading={loading}
      />
    </ModalLayout>
  );
};

export default ModalForm;