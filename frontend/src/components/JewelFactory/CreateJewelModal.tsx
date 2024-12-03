import { useState } from "react";
import { CreateJewelDTO, MaterialInventory } from "@/infraestructure/IJewelFactory";
import { useJewelFactoryService } from "@/hooks/jewel-factory/useJewelFactoryService";
import { useAuth } from "@/context/AuthContext";

interface CreateJewelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (jewel: CreateJewelDTO) => Promise<void>;
}

export function CreateJewelModal({ isOpen, onClose, onSubmit }: CreateJewelModalProps) {
    const { provider } = useAuth();
    const { inventory, getAllMaterialsInventory } = useJewelFactoryService(provider);
    
    const [formData, setFormData] = useState<CreateJewelDTO>({
        name: "",
        quantity: 1,
        materials: [],
        data: {
            quality: 0,
            design: "",
            certification: ""
        }
    });

    const [selectedMaterial, setSelectedMaterial] = useState({
        materialId: "",
        quantity: 0
    });

    const handleAddMaterial = () => {
        if (selectedMaterial.materialId && selectedMaterial.quantity > 0) {
            setFormData({
                ...formData,
                materials: [...formData.materials, {
                    materialId: selectedMaterial.materialId,
                    quantity: selectedMaterial.quantity
                }]
            });
            setSelectedMaterial({ materialId: "", quantity: 0 });
        }
    };

    const handleRemoveMaterial = (index: number) => {
        setFormData({
            ...formData,
            materials: formData.materials.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
            setFormData({
                name: "",
                quantity: 1,
                materials: [],
                data: {
                    quality: 0,
                    design: "",
                    certification: ""
                }
            });
        } catch (error) {
            console.error("Error al crear la joya:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-lg mb-4">Fabricar Nueva Joya</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Información básica */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nombre</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Cantidad</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={formData.quantity}
                                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Materiales */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Materiales</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                className="select select-bordered flex-1"
                                value={selectedMaterial.materialId}
                                onChange={(e) => setSelectedMaterial({
                                    ...selectedMaterial,
                                    materialId: e.target.value
                                })}
                            >
                                <option value="">Seleccionar material</option>
                                {inventory.map((item) => (
                                    <option key={item.materialId} value={item.materialId}>
                                        {item.materialId} (Disponible: {item.quantity})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="input input-bordered w-24"
                                placeholder="Cant."
                                value={selectedMaterial.quantity || ""}
                                onChange={(e) => setSelectedMaterial({
                                    ...selectedMaterial,
                                    quantity: parseInt(e.target.value)
                                })}
                                min="1"
                            />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddMaterial}
                            >
                                Añadir
                            </button>
                        </div>

                        {/* Lista de materiales seleccionados */}
                        <div className="mt-2">
                            {formData.materials.map((material, index) => (
                                <div key={index} className="flex items-center gap-2 mt-2">
                                    <span className="flex-1">
                                        {material.materialId} - Cantidad: {material.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => handleRemoveMaterial(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Datos adicionales */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Calidad (quilates)</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                value={formData.data.quality}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    data: {
                                        ...formData.data,
                                        quality: parseInt(e.target.value)
                                    }
                                })}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Diseño</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={formData.data.design}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    data: {
                                        ...formData.data,
                                        design: e.target.value
                                    }
                                })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Certificación</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={formData.data.certification}
                            onChange={(e) => setFormData({
                                ...formData,
                                data: {
                                    ...formData.data,
                                    certification: e.target.value
                                }
                            })}
                            required
                        />
                    </div>

                    {/* Botones de acción */}
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Crear Joya
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 