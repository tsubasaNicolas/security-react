import React, { useState } from "react";
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
import AppRouter from "../../routers/AppRouter";

const { Title, Text } = Typography;

const { Header, Sider, Content, Footer } = Layout;

export default function LayoutApp() {
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed(!collapsed);
  }
  //  const logo = { url: "../assets/images/logoSeguridad.png" };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            src={logo}
            alt="logo seguridad"
            width="30px"
            style={{ marginTop: 1, borderRadius: "12%" }}
          />
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <NavLink exact to="/colaboradores">
              Colaboradores
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            <NavLink exact to="/locales">
              Locales
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<LoginOutlined />}>
            <NavLink exact to="/controlingreso">
              Ingreso Guardias
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<CloseCircleOutlined />}>
            <NavLink exact to="/controlcierre">
              Cierre Locales
            </NavLink>
          </Menu.Item>
        </Menu>

        {collapsed ? (
          <FullscreenOutlined className="trigger" onClick={() => toggle()} />
        ) : (
          <FullscreenExitOutlined
            className="trigger"
            onClick={() => toggle()}
          />
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ backgroundColor: "#2E4053", padding: 0, height: "auto" }}
        >
          <Title level={3} style={{ color: "#D7DBDD", marginTop: 10 }}>
            {" "}
            Control de Seguridad
          </Title>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <AppRouter />
        </Content>
        <Footer style={{ backgroundColor: "#154360" }}>
          <Text style={{ color: "#D7DBDD", marginTop: 10 }}>
            Desarrollado por Nicolás Carrasco - 2021 - copyright
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}
