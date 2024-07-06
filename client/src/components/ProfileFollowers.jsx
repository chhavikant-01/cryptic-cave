import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

export default function UserFollowers() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Followers</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6 xl:grid-cols-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">shadcn</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">jaredpalmer</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">maxleiter</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">shuding_</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">juliuscc</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>TN</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">timneutkens</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">leerob</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-16 h-16 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>RG</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-muted-foreground">rauchg</div>
          </div>
        </div>
      </div>
    </section>
  )
}