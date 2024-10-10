import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
class DatabaseFile {
  @Field(() => Int)
  id: number;

  @Field()
  filename: string;

  // @Field()
  // data: Uint8Array; // or you can use string if you prefer base64 encoding
}

export default DatabaseFile;
