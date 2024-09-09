"use client"

import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { PanelMenu } from 'primereact/panelmenu'
import { MenuItem } from 'primereact/menuitem'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

interface SubMenu {
  title: string
}

interface MenuItemData {
  title: string
  submenus: SubMenu[]
}

const menuItems: MenuItemData[] = [
  {
    "title": "Chemical Engineering Thermodynamics",
    "submenus": [
      { "title": "Section 1" },
      { "title": "Section 2" },
      { "title": "Section 3" },
      { "title": "Section 4" },
      { "title": "Section 5" }
    ]
  },
  {
    "title": "Fluid Mechanics",
    "submenus": [
      { "title": "Section 1" },
      { "title": "Section 2" },
      { "title": "Section 3" },
      { "title": "Section 4" },
      { "title": "Section 5" },
      { "title": "Section 6" },
      { "title": "Section 7" }
    ]
  },
  {
    "title": "Heat Transfer",
    "submenus": [
      { "title": "Section 1" },
      { "title": "Section 2" },
      { "title": "Section 3" },
      { "title": "Section 4" },
      { "title": "Section 5" },
      { "title": "Section 6" },
      { "title": "Section 7" },
      { "title": "Section 8" },
      { "title": "Section 9" },
      { "title": "Section 10" },
      { "title": "Section 11" }
    ]
  },
  {
    "title": "Mass Transfer",
    "submenus": [
      { "title": "Section 1" },
      { "title": "Section 2" },
      { "title": "Section 3" },
      { "title": "Section 4" },
      { "title": "Section 5" },
      { "title": "Section 6" },
      { "title": "Section 7" },
      { "title": "Section 8" },
      { "title": "Section 9" },
      { "title": "Section 10" },
      { "title": "Section 11" },
      { "title": "Section 12" },
      { "title": "Section 13" },
      { "title": "Section 14" }
    ]
  },
  {
    "title": "Mechanical Operations",
    "submenus": [
      { "title": "Section 1" },
      { "title": "Section 2" },
      { "title": "Section 3" },
      { "title": "Section 4" },
      { "title": "Section 5" },
      { "title": "Section 6" },
      { "title": "Section 7" },
      { "title": "Section 8" },
      { "title": "Section 9" }
    ]
  },
  {
    "title": "Process Equipment and Plant Design",
    "submenus": [
      { "title": "Section 1" },
      { "title": "Section 2" },
      { "title": "Section 3" },
      { "title": "Section 4" },
      { "title": "Section 5" },
      { "title": "Section 6" },
      { "title": "Section 7" },
      { "title": "Section 8" }
    ]
  }
]

interface NavBarProps {
  isVisible: boolean
  onTopicChange: (topic: string) => void;
  onSectionChange: (section: string) => void;
  setVisible: (visible: boolean) => void;
}

export default function NavBar({onTopicChange, onSectionChange, isVisible, setVisible}: NavBarProps) {

  const items: MenuItem[] = menuItems.map((item) => ({
    label: item.title,
    icon: 'pi pi-fw pi-book',
    items: item.submenus.map((submenu) => ({
      label: submenu.title,
      icon: 'pi pi-fw pi-file',
      command: () => {
        onTopicChange(item.title);
        onSectionChange(submenu.title);
        setVisible(false);
      }
    })),
  }))

  return (
    <div className="card flex justify-content-center">
      <Sidebar visible={isVisible} onHide={() => setVisible(false)}>
        <h2 className="text-xl font-bold mb-4">Course Menu</h2>
        <PanelMenu model={items} className="w-full md:w-25rem" />
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
    </div>
  )
}