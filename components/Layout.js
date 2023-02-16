import { Nav } from './Nav'

export const Layout = ({children}) => {
    return (
    <div className='mx-6 md:max-w2xl md:mx-auto'>
        <Nav/>
        <main>{children}</main>
    </div>
    )
  };