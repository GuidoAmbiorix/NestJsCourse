import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto, LoginUserDto} from "./dto";
import {AuthGuard} from "@nestjs/passport";
import {User} from "./entities/user.entity";
import {Auth, GetUser, RawHeaders} from "./decorators";
import {UserRoleGuard} from "./guards/user-role/user-role.guard";
import {RoleProtected} from "./decorators/role-protected.decorator";
import {ValidRoles} from "./interfaces";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto)
    return this.authService.login(loginUserDto);  
  }

  @Get('private')
  @UseGuards(AuthGuard())
  TestingPrivateRoute(
      @GetUser() user:User,
      @GetUser('email') userEmail:string,
      @RawHeaders() rawHeaders:string[],
  ){
    return {
      ok:true,
      message:'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders
    }
  }
  
  @Get('private2')
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(),UserRoleGuard)
  privateRoute2(
      @GetUser() user:User,
  ){
    return {
      ok:true,
      user
    }
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(
      @GetUser() user:User,
  ){
    return {
      ok:true,
      user
    }
  }
}
 