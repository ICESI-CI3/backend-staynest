import { User } from './entities/user.entity';
import { Role } from 'src/enums/role.enum';

describe('User Entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
    });

    it('should have a uuid id', () => {
        user.id = '123e4567-e89b-12d3-a456-426614174000';
        expect(typeof user.id).toBe('string');
    });

    it('should have a password', () => {
        user.password = 'password123';
        expect(user.password).toBe('password123');
    });

    it('should have a unique email', () => {
        user.email = 'test@example.com';
        expect(user.email).toBe('test@example.com');
    });

    it('should have a name', () => {
        user.name = 'Test User';
        expect(user.name).toBe('Test User');
    });

    it('should have a role', () => {
        user.role = Role.ADMIN;
        expect(user.role).toBe(Role.ADMIN);
    });

    it('should lowercase and trim email before insert', () => {
        user.email = '  TEST@EXAMPLE.COM  ';
        user.checkFieldsBeforeInsert();
        expect(user.email).toBe('test@example.com');
    });
});