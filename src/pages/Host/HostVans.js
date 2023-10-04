import React from 'react'
import { Link, useLoaderData, defer, Await } from 'react-router-dom'
import { getHostVans } from '../../api'
import { requireAuth } from '../../utils'

export async function loader({ request }) {
  return defer({ van: getHostVans(), user: await requireAuth(request) })
}

function HostVans() {
  const vansPromise = useLoaderData()

  function renderVansData(vans) {
    const vansData = vans.map(van =>
      <Link
        to={`${van.id}`}
        key={van.id}
        className="host-van-link-wrapper"
      >
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`van of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    )
    return (
      <div className="host-vans-list">
        <section>
          {vansData}
        </section>
      </div>
    )
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <React.Suspense fallback={<h1>Loading.....</h1>}>
        <Await resolve={vansPromise.van}>
          {
            renderVansData
          }
        </Await>
      </React.Suspense>
    </section>
  )
}

export default HostVans