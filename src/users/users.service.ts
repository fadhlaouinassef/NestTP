import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Utilisateurs } from '../entities/utilisateurs/utilisateurs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Utilisateurs)
    private readonly utilisateursRepository: Repository<Utilisateurs>,
  ) {}

  /**
   * 1. Créer un nouvel utilisateur avec active = false par défaut
   */
  async create(createUserDto: CreateUserDto): Promise<Utilisateurs> {
    const utilisateur = this.utilisateursRepository.create({
      ...createUserDto,
      active: false, // Propriété active définie à false lors de la création
    });
    return await this.utilisateursRepository.save(utilisateur);
  }

  /**
   * 2. Récupérer tous les utilisateurs
   */
  async findAll(): Promise<Utilisateurs[]> {
    return await this.utilisateursRepository.find();
  }

  /**
   * 3. Trouver un utilisateur par son id
   */
  async findOneById(id: string): Promise<Utilisateurs> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }
    
    const utilisateur = await this.utilisateursRepository.findOne({
      where: { _id: new ObjectId(id) } as any,
    });

    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec id ${id} non trouvé`);
    }

    return utilisateur;
  }

  /**
   * 4. Trouver un utilisateur par son email
   */
  async findOneByEmail(email: string): Promise<Utilisateurs> {
    const utilisateur = await this.utilisateursRepository.findOne({
      where: { email } as any,
    });

    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec email ${email} non trouvé`);
    }

    return utilisateur;
  }

  /**
   * 5. Trouver tous les utilisateurs avec active = true
   */
  async findActive(): Promise<Utilisateurs[]> {
    return await this.utilisateursRepository.find({
      where: { active: true } as any,
    });
  }

  /**
   * 7. Mettre à jour partiellement un utilisateur
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Utilisateurs> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }

    const utilisateur = await this.findOneById(id);

    // Mise à jour partielle des propriétés
    Object.assign(utilisateur, updateUserDto);

    return await this.utilisateursRepository.save(utilisateur);
  }

  /**
   * 8. Supprimer un utilisateur (utilise remove() pour déclencher @BeforeRemove hook)
   */
  async remove(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }

    const utilisateur = await this.findOneById(id);

    // Utiliser remove() au lieu de delete() pour déclencher le hook @BeforeRemove
    await this.utilisateursRepository.remove(utilisateur);
  }

  /**
   * 9. Activer un compte utilisateur en vérifiant le password
   */
  async activateAccount(id: string, password: string): Promise<Utilisateurs> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }

    const utilisateur = await this.findOneById(id);

    // Vérifier le mot de passe
    if (utilisateur.password !== password) {
      throw new BadRequestException('Mot de passe incorrect');
    }

    // Activer le compte
    utilisateur.active = true;
    return await this.utilisateursRepository.save(utilisateur);
  }
}
