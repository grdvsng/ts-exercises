jest.spyOn(global.console, 'log')

import * as decorators from '../decorators';

@decorators.hasmeta( { 
    table: 'TEST',
    database: 'DIST'
} )
@decorators.stringable
class TestClass<T=unknown> {
    public readonly meta?: T;

    @decorators.debugProperty()
    public name: string;
    @decorators.format("I'm %s")
    public greetings: String;

    constructor(
        name: string = '',
        greetings: String = '',
    ) {
        this.name = name;
        this.greetings = greetings;
    }

    @decorators.debug()
    public decorated_method_0(...argv: unknown[]): void {

    }

    @decorators.factor(2)
    public decorated_method_1(number: number): number {
        return number + 1
    }
}

describe("test decorators", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("method decorator", () => {
        it.each([{
            'args': [1, 2],
        }, {
            'args': ['123', 457],
        }])("Console should be called with $args", ({ args }) => {
            const t = new TestClass;

            t.decorated_method_0(args);

            expect(console.log).toBeCalledWith(args);
        });

        it.each([{
            'args': 5,
            'result': 12
        }, {
            'args': 6,
            'result': 14
        }])("Result of call with $args will be $result", ({ args, result }) => {
            const t = new TestClass;

            expect(t.decorated_method_1(args)).toBe(result);
        });
    });

    describe("property decorator", () => {
        it.each(["Kris", "Sara"])
            ("Console should be called with %s", (name) => {
                const t = new TestClass(name);

                t.name;

                expect(console.log).toBeCalledWith(name);
            });

        it.each([{ name: "Kris", result: "I'm Kris" }, { name: "Sara", result: "I'm Sara" }])
            ("Getter with property name $name should return $result", ({ name, result }) => {
                const t = new TestClass(name, name);

                expect(t.greetings).toBe(result);
            });
    });

    describe("property decorator", () => {
        it.each([{ name: "Kris", result: "TestClass(Kris)" }, { name: "Sara", result: "TestClass(Sara)" }])
            ("Class display would be $result", ({ name, result }) => {
                const t = new TestClass(name);

                console.log(`${t}`);

                expect(console.log).toBeCalledWith(result);
            });

        it('Decorator meta should extend class via meta attribute', ( ) => {
            const t = new TestClass<{ 
                table: string;
                database: string;
            }>();

            expect(t.meta).toEqual({
                table: 'TEST',
                database: 'DIST'
            });
        });
    });
});