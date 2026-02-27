import { Link } from "react-router"

const Menu = () => {
    const MenuArray1 = [
        {
            id: '1',
            title: 'Expenses',
            path: ''
        },
        {
            id: '2',
            title: 'Chart',
            path: '/chart'
        },
        {
            id: '3',
            title: 'Filter',
            path: '/filter'
        },
    ]
  return (
    <div className="MenuSection inline bg-blue-400">
          <ul
              className="menuBox p-5 bg-blue-400 flex flex-col gap-5"
          >              
            {MenuArray1.map((item) => {
                  return (                      
                      <li
                        key={item.id} className="menuList text-white text-xl"
                      >
                        <Link to={item?.path}>
                            {item.title}
                        </Link>
                      </li>
                  )
            })}
          </ul>
    </div>
  )
}

export default Menu