import {Rol} from "../enum/rol.enum";
import {ApiProperty} from "@nestjs/swagger";

export class Talent {
    @ApiProperty()
    _id:string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    surname: string;
    @ApiProperty()
    mail: string;
    @ApiProperty()
    photo: string;
    @ApiProperty()
    rol: Rol;
    @ApiProperty()
    avail: boolean;
}
