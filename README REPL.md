## List

```bash
# debug(moduleCls?: ClassRef | string) => void
$ debug()

# get(token: InjectionToken) => any
$ get or $

# methods(token: ClassRef | string) => void
$ methods()

# resolve(token: InjectionToken, contextId: any) => Promise<any>
$ resolve()

# select(token: DynamicModule | ClassRef) => INestApplicationContext
$ select()
```

> Examples:
> debug()
>
AppModule:
-   controllers:
- ◻ AppController 
-   providers:
- ◻ AppService