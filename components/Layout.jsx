import { Nav } from './Nav'

export const Layout = ({children}) => {
    return (
    <div className='mx-6 md:max-w-2xl md:mx-auto font-roboto'>
        <Nav/>
        <main>{children}</main>
    </div>
    )
  };