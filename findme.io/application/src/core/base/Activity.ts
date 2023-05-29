/***
 *  @author re1nhart
 *  From project to project
 */
export abstract class Activity {
    public abstract onCreate(initialProps: any): Promise<void>;

    public abstract onUpdate(): Promise<void>;

    public abstract onFallbackCreate(initialProps: any): Promise<void>;
}