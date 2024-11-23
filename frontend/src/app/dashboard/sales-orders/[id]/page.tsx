"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/dateUtils";
import { SalesOrderDetail } from "@/types/salesOrder";

export default function SalesOrderDetails({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();

  // TODO: Reemplazar con datos reales
  const orderDetails: SalesOrderDetail = {
    id: params.id,
    creationDate: new Date("2024-02-20"),
    customer: "Cliente A",
    products: "Anillo de Oro, Collar de Plata",
    totalQuantity: 2,
    status: "Pendiente",
    paymentMethod: "Criptomoneda",
    items: [
      {
        id: "ITEM-001",
        productName: "Anillo de Oro 18k",
        quantity: 1,
        unit: "unidad",
        price: 1500.00
      },
      {
        id: "ITEM-002",
        productName: "Collar de Plata 925",
        quantity: 1,
        unit: "unidad",
        price: 500.00
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles de Orden de Venta #{params.id}</h1>
        <button 
          onClick={() => router.back()} 
          className="btn btn-outline"
        >
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Información General</h2>
            <div className="space-y-2">
              <p><span className="font-bold">Fecha de Creación:</span> {formatDate(orderDetails.creationDate)}</p>
              <p><span className="font-bold">Cliente:</span> {orderDetails.customer}</p>
              <p><span className="font-bold">Estado:</span> {orderDetails.status}</p>
              <p><span className="font-bold">Método de Pago:</span> {orderDetails.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Resumen</h2>
            <div className="space-y-2">
              <p><span className="font-bold">Cantidad Total:</span> {orderDetails.totalQuantity}</p>
              <p><span className="font-bold">Valor Total:</span> ${orderDetails.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Detalle de Productos</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Unidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 