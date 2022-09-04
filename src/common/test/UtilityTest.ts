import { User } from "src/user/entities/user.entity";

export default class UtilityTest {
  static giveAMeValidUser(): User {
    const user = new User();
    user.id = '12313123-123123a-asdad';
    user.email = 'valid@email.com';
    user.name = 'Bruno é válido';
    user.password = '123456';
    user.active = true;
    user.createdAt = new (Date as any)();
    return user;
  }
}