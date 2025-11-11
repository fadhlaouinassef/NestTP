import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: "Le nom d'utilisateur doit être une chaîne." })
  @IsNotEmpty({ message: 'Le champ username est requis.' })
  username!: string;

  @IsString({ message: "L'email doit être une chaîne." })
  @IsNotEmpty({ message: 'Le champ email est requis.' })
  @IsEmail({}, { message: "L'adresse email fournie est invalide." })
  email!: string;

  // status est optionnel dans le DTO pour la création (par défaut 'inactive' si non fourni)
  @IsString({ message: 'Le statut doit être une chaîne.' })
  status?: string;
}
