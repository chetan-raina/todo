export class Priority {
  static readonly LOW = new Priority("LOW", 0, "Low");
  static readonly MEDIUM = new Priority("MEDIUM", 1, "Medium");
  static readonly HIGH = new Priority("HIGH", 2, "High");

  static values(): Priority[] {
    return [this.LOW, this.MEDIUM, this.HIGH];
  }

  static valueOf(name: string): Priority {
    const value = (this as any)[name];
    if (value) return value;
    const cls: string = (this as any).prototype.constructor.name;
    throw new RangeError(`Illegal argument: ${name} is not a member of ${cls}`);
  }

  private constructor(
    public readonly name: string,
    public readonly value: number,
    public readonly label: string
  ) {}
}

export class SortOrder {
  static readonly UNSORTED = new SortOrder("UNSORTED", "Unsorted");
  static readonly HIGHT_TO_LOW = new SortOrder("HIGHT_TO_LOW", "High to low");
  static readonly LOW_TO_HIGH = new SortOrder("LOW_TO_HIGH", "Low to high");

  static values(): SortOrder[] {
    return [this.UNSORTED, this.HIGHT_TO_LOW, this.LOW_TO_HIGH];
  }

  static valueOf(name: string): SortOrder {
    const value = (this as any)[name];
    if (value) return value;
    const cls: string = (this as any).prototype.constructor.name;
    throw new RangeError(`Illegal argument: ${name} is not a member of ${cls}`);
  }

  private constructor(
    public readonly name: string,
    public readonly label: string
  ) {}
}

export class CompletionFilter {
  static readonly ALL = new CompletionFilter("ALL", "All");
  static readonly COMPLETED = new CompletionFilter("COMPLETED", "Completed");
  static readonly PENDING = new CompletionFilter("PENDING", "Pending");

  static values(): CompletionFilter[] {
    return [this.ALL, this.COMPLETED, this.PENDING];
  }

  static valueOf(name: string): CompletionFilter {
    const value = (this as any)[name];
    if (value) return value;
    const cls: string = (this as any).prototype.constructor.name;
    throw new RangeError(`Illegal argument: ${name} is not a member of ${cls}`);
  }

  private constructor(
    public readonly name: string,
    public readonly label: string
  ) {}
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  isCompleted: boolean;
}
