import { IsString, IsNotEmpty, Length, validate } from 'class-validator';

class CreateBoardDto {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    static validate(dto) {
        return validate(dto);
    }
}

const applyDecorators = (target, propertyKey, decorators) => {
    decorators.forEach(decorator => {
        decorator(target, propertyKey);
    });
};

applyDecorators(CreateBoardDto.prototype, 'name', [
    IsString(),
    IsNotEmpty(),
    Length(3, 50)
]);

applyDecorators(CreateBoardDto.prototype, 'description', [
    IsString(),
    IsNotEmpty(),
    Length(3, 255)
]);

export default CreateBoardDto
