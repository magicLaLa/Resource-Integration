/**
 * @descript 用TypeScript装饰器实现一个简单的依赖注入
 * 所谓依赖注入，就是把底层类作为参数传入上层类，实现上层类对下层类的“控制”
 * https://mp.weixin.qq.com/s/waBAJgYaOJQu2qdcbgmi1A
 */
import Container from './Container';
import { Service } from './Service';
import { Inject } from './Inject';

 /**
  * 提供者
  */
@Service(true)
class LogService {
  public debug(...args: any[]): void {
    console.debug('[DEB]', new Date(), ...args);
  }
  public info(...args: any[]): void {
    console.info('[INF]', new Date(), ...args);
  }
  public error(...args: any[]): void {
    console.error('[ERR]', new Date(), ...args);
  }
}

Container.set('token', 'test-123');
/**
 * 消费者
 */
class CustomerController {

  @Inject()
  private log: LogService;
  private toekn = Container.get('token');

  public main(): void {
    this.log.info(this.toekn);
  }
}

/**
 * 现在我们看到，消费者在 constructor 构造函数内对 LogService 进行了实例化，并在 main 函数内进行了调用，这是传统的调用方式。
 * 当 LogService 变更，修改了构造函数，而这个模块被依赖数很多，我们就得挨个找到引用此模块的部分，并一一修改实例化代码
 */
