import React from 'react'

export const App: React.VFC<{}> = () => {
  const [user, setUser] = React.useState<{
    id: string
    name: string
    picture: string
  }>()

  React.useEffect(() => {
    window.liff.getProfile().then((profile) =>
      setUser({
        id: profile.userId,
        name: profile.displayName,
        picture: profile.pictureUrl!,
      })
    )
  })

  if (user == null) {
    return <>Loading...</>
  }

  return (
    <>
      <div className="flex justify-center p-4">
        <div className="flex items-stretch border-2 border-gray rounded max-w-md p-2">
          <img src="" className="rounded-full" />
          <div className="ml-4 flex items-center">
            <div>
              <div>id: {user.id}</div>
              <div>name: {user.name}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
