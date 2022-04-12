import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util'; // promisify is a function that takes a callback and returns a promise
import { ConfigService } from '@nestjs/config'; // ConfigService is a class that provides access to the configuration of the application
import { GqlExecutionContext } from '@nestjs/graphql';


// guard no nest funciona como um middleware do express

@Injectable()
export class AuthorizationGuard implements CanActivate {

  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';

  }


  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    // const httpContext = context.switchToHttp()

    // const request = httpContext.getRequest()
    // const response  = httpContext.getResponse()

    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify( jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
      }),
      audience: this.AUTH0_AUDIENCE,
      issuer: this.AUTH0_DOMAIN,
      algorithms: ['RS256'],
    }));

    try {
      await checkJWT(req, res);
      return true;
    
    }catch(err) {
     throw new UnauthorizedException(err); // UnauthorizedException é uma classe padrao do nestjs
    }

   


  }
}
