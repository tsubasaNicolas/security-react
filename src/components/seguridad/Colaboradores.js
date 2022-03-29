import React, { useEffect, useState } from "react";
import {
  saveIngreso,
  getIngresoColaboradores,
} from "../../apis/apiControlIngresos";
import { Card, Col, Row } from "antd";
import Swal from "sweetalert2";
import Header from "../layout/Header";

export default function ColaboradoresPage() {
  const [ingresoColaboradores, setIngresoColaboradores] = useState([]);
  const [checked, setChecked] = useState(true);

  const loadIngresoColaboradores = async () => {
    const data = await getIngresoColaboradores();
    setIngresoColaboradores(data);
    console.log(data);
    console.log(ingresoColaboradores);
  };

  var conBordes = {
    border: "2px solid aqua",
    backgroundColor: "aqua",
    marginTop: 10,
    color: "white",
  };
  var sinBordes = { border: "1px solid grey", marginTop: 10 };

  function submit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Estás seguro?",
      text:
        e.target.estado.value === "Activo"
          ? `que el trabajador ** ${e.target.nombre.value} ** termina de trabajar`
          : `que el trabajador ** ${e.target.nombre.value} ** comienza a trabajar`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        saveIngreso({
          id_colaborador: e.target.id_colaborador.value,
          ingreso: e.target.ingreso.value,
          estado: e.target.estado.value === "Activo" ? "Descanso" : "Activo",
          fecha_hora: null,
        });
        setChecked(!checked);
        loadIngresoColaboradores();
        Swal.fire({
          title: "Ingreso",
          text:
            e.target.estado.value === "Activo"
              ? `el trabajador ** ${e.target.nombre.value} ** está en Descanso`
              : `el trabajador ** ${e.target.nombre.value} ** está Activo`,
          icon: "warning",
          position: "top-center",
          timer: 3000,
        });
      }
    });
  }

  useEffect(() => {
    loadIngresoColaboradores();
    // eslint-disable-next-line
  }, [checked]);

  return (
    <div className="site-card-wrapper">
      <Header />
      <Row gutter={16} style={{ justifyContent: "space-around" }}>
        {ingresoColaboradores.map(function (colaborador, index, array) {
          return (
            <>
              <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }} key={index}>
                <Card
                  theme="dark"
                  title={colaborador.nombre}
                  headStyle={{
                    fontSize: 18,
                    marginTop: 10,
                    height: 80,
                  }}
                  style={
                    colaborador.estado === "Activo" ? conBordes : sinBordes
                  }
                  // bordered={false}
                  hoverable={true}
                  bodyStyle={{ backgroundColor: "grey" }}
                >
                  {/* <div>{colaborador.id_colaborador}</div> */}

                  <div
                    style={{
                      fontSize: 18,
                      color:
                        colaborador.estado === "Activo" ? "#50F10F" : "white",
                    }}
                  >
                    {colaborador.estado}
                  </div>

                  <div>Fecha: {colaborador.fecha_hora}</div>

                  <form onSubmit={submit}>
                    <input
                      type="hidden"
                      name="id_colaborador"
                      value={colaborador.id_colaborador}
                    />
                    <input
                      type="hidden"
                      name="ingreso"
                      value={!colaborador.ingreso}
                    />
                    <input
                      type="hidden"
                      name="estado"
                      value={colaborador.estado}
                    />

                    <input
                      type="hidden"
                      name="nombre"
                      value={colaborador.nombre}
                    />

                    <button
                      type="submit"
                      style={{ background: "teal", marginTop: 30, padding: 10 }}
                      // onClick={() => alert()}
                    >
                      Ingreso/Salida
                    </button>
                  </form>
                </Card>
              </Col>
            </>
          );
        })}
      </Row>
    </div>
  );
}
