import Posts from "./components/Posts";

import MyProfilePic from './components/MyProfilePic'

//ponemos las opcion de configuracion "revalidate" en este caso, s epone en segundos (86400 seria undia)
export const revalidate = 86400


export default function Home() {
  return (
    <div className="mx-auto">
        <MyProfilePic />
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Federcio Blanco</span>.
        </span>
      </p>
      {/* Debemos poner este comentario para indicar que habra un error te typescript */}
      <Posts/>
    </div>
  )
}
