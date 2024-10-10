import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class GraphQlLocalAuthenticationGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const { loginData } = gqlContext.getArgs();  // Get the loginData from args
    
    // Manually attach loginData (email and password) to the request body
    request.body = loginData;

    return request;
  }
}
