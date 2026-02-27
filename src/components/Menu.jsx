import { Link } from "react-router"

const Menu = () => {
    const MenuArray1 = [
        {
            id: '1',
            title: 'Dasboard'
        },
        {
            id: '2',
            title: 'Chart'
        },
        {
            id: '3',
            title: 'Category'
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
                        <Link to={''}>
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