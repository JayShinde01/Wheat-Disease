import { useState } from "react";
import {
  Layout,
  Drawer,
  Menu,
  Avatar,
  Typography
} from "antd";

import {
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  CameraOutlined,
  TeamOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../service/authService";
import JotformChatbot from "../component/JotformChatbot";


const { Header, Content } = Layout;
const { Title } = Typography;


function MainLayout() {

  const [open,setOpen] = useState(false);

  const navigate = useNavigate();


  return (

    <Layout
      style={{
        minHeight:"100vh"
      }}
    >


      {/* TOP NAVIGATION */}

      <Header
        style={{
          background:"#fff",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"0 16px",
          position:"sticky",
          top:0,
          zIndex:100,
          boxShadow:"0 2px 8px rgba(0,0,0,.08)"
        }}
      >

        <MenuOutlined
          style={{
            fontSize:22,
            cursor:"pointer"
          }}
          onClick={()=>setOpen(true)}
        />


        <Title
          level={4}
          style={{
            margin:0
          }}
        >
          🌾 Kissan Rakshak
        </Title>


        <Avatar
          icon={<UserOutlined/>}
        />


      </Header>



      {/* SIDE DRAWER */}

      <Drawer
        title="Menu"
        open={open}
        onClose={()=>setOpen(false)}
      >

        <Menu

          items={[
            {
              key:"profile",
              icon:<UserOutlined/>,
              label:"Profile",
              onClick:()=>navigate("/profile")
            },

            {
              key:"settings",
              icon:<SettingOutlined/>,
              label:"Settings"
            },

            {
              key:"logout",
              icon:<LogoutOutlined/>,
              label:"Logout",
              onClick:logout
            }
          ]}

        />

      </Drawer>



      {/* ONLY THIS AREA CHANGES */}

      <Content
        style={{
          padding:20,
          paddingBottom:80
        }}
      >

        <Outlet/>
       
      </Content>
 <JotformChatbot />


      {/* BOTTOM NAVIGATION */}

      <div
        style={{
          position:"fixed",
          bottom:0,
          width:"100%",
          background:"#fff",
          display:"flex",
          justifyContent:"space-around",
          padding:"10px 0",
          borderTop:"1px solid #ddd",
          zIndex:100
        }}
      >


        <NavItem
          icon={<HomeOutlined/>}
          label="Home"
          onClick={()=>navigate("/home")}
        />


        <NavItem
          icon={<CameraOutlined/>}
          label="Detection"
          onClick={()=>navigate("/detection")}
        />


        <NavItem
          icon={<TeamOutlined/>}
          label="Community"
          onClick={()=>navigate("/community")}
        />


        <NavItem
          icon={<InfoCircleOutlined/>}
          label="Info"
          onClick={()=>navigate("/info")}
        />


      </div>


    </Layout>

  )
}



function NavItem({icon,label,onClick}){

return (

<div
onClick={onClick}
style={{
display:"flex",
flexDirection:"column",
alignItems:"center",
cursor:"pointer"
}}
>

<div style={{fontSize:22}}>
{icon}
</div>

<span>
{label}
</span>

</div>

)

}


export default MainLayout;