import React, { useEffect, useState } from "react";
import { saveCierre, getCierrelocales } from "../../apis/apiControlLocales";
import { Card, Col, Row } from "antd";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
//import "antd/dist/antd.css";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  TeamOutlined,
  ShopOutlined,
  CloseCircleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logoSeguridad.png";
import "antd/dist/antd.css";
import "antd/dist/antd.less";
import { useAuth } from "../../context/authContext";
import Header from "../layout/Header";
const { Title, Text } = Typography;

const { Sider, Content, Footer } = Layout;

export default function LocalesPage() {
  const { user, logout, loading } = useAuth();
  console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const [cierreLocales, setCierreLocales] = useState([]);
  const [checked, setChecked] = useState(true);

  const loadCierreLocales = async () => {
    const data = await getCierrelocales();
    setCierreLocales(data);
    console.log(data);
  };

  var conBordes = {
    border: "2px solid lime",
    backgroundColor: "lime",
    marginTop: 10,
    color: "white",
  };
  var sinBordes = { border: "1px solid grey", marginTop: 10 };

  function submit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Estás seguro?",
      text:
        e.target.estado.value === "Abierto"
          ? `que deseas cerrar el local ** ${e.target.local.value} ** `
          : `que deseas Abrir el local ** ${e.target.local.value} **`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.isConfirmed) {
        saveCierre({
          id_local: e.target.id_local.value,
          cierre: e.target.cierre.value,
          estado: e.target.estado.value === "Abierto" ? "Cerrado" : "Abierto",
          fecha_hora: null,
        });
        setChecked(!checked);
        loadCierreLocales();
        Swal.fire({
          title: "Ingreso",
          text:
            e.target.estado.value === "Abierto"
              ? `el local ${e.target.local.value} está Cerrado`
              : `el local ${e.target.local.value} está Abierto`,
          icon: "warning",
          position: "top-center",
          timer: 3000,
        });
      }
    });
  }

  useEffect(() => {
    loadCierreLocales();
    // eslint-disable-next-line
  }, [checked]);
  // import AppRouter from "../../routers/AppRouter";

  return (
    <div className="site-card-wrapper">
      <Header />
      <Row
        gutter={16}
        style={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {cierreLocales.map(function (local, index, array) {
          return (
            <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }} key={index}>
              <Card
                theme="dark"
                title={local.local}
                headStyle={{ fontSize: 18, marginTop: 10, padding: 10 }}
                style={local.estado === "Abierto" ? conBordes : sinBordes}
                // bordered={false}
                hoverable={true}
                bodyStyle={{ backgroundColor: "grey", width: 200 }}
              >
                <div
                  style={{
                    fontSize: 18,
                    color: local.estado === "Abierto" ? "#50F10F" : "yellow",
                  }}
                >
                  {local.estado}
                </div>
                <div>Fecha: {local.fecha_hora}</div>

                <form onSubmit={submit}>
                  <input type="hidden" name="id_local" value={local.id_local} />
                  <input type="hidden" name="cierre" value={!local.cierre} />
                  <input type="hidden" name="estado" value={local.estado} />
                  <input type="hidden" name="local" value={local.local} />

                  <button
                    type="submit"
                    //onClick={() => alert()}
                    style={{
                      background: "teal",
                      marginTop: 30,
                      padding: 10,
                    }}
                    // onClick={(e) => submit(e)}
                  >
                    Abierto/Cerrado
                  </button>
                  <div style={{ marginTop: 15 }}>
                    Encargado: {local.encargado}
                  </div>
                </form>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
