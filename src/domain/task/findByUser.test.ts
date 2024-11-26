import { TaskModel } from "../../db/models/task";
import findByUser from "./findByUser";

jest.mock("../../db/models/task");

const mockedTaskModel = TaskModel as unknown as jest.Mock<typeof TaskModel>;

describe("findByUser", () => {
  const testTasks = [
    {
      id: 24,
      title: "Search backend",
      description: "handle search term and dueAt on getAll endpoint",
      status: "OPEN",
      dueAt: "2024-11-25T00:00:00.000Z",
      createdAt: "2024-11-25T01:15:08.284Z",
      updatedAt: "2024-11-25T01:15:08.284Z",
      authorId: 1,
    },
    {
      id: 25,
      title: "Search frontend",
      description: "parse dueAt ranges with date-fns",
      status: "OPEN",
      dueAt: "2024-11-25T00:00:00.000Z",
      createdAt: "2024-11-25T01:15:50.580Z",
      updatedAt: "2024-11-25T01:15:50.580Z",
      authorId: 1,
    },
  ];
  describe("without search term", () => {
    beforeEach(() => {
      //@ts-ignore
      mockedTaskModel.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(testTasks),
      });
    });
    it("should get users by authorId", async () => {
      const response = await findByUser(1);
      //@ts-ignore
      expect(mockedTaskModel.find).toHaveBeenCalledWith({ authorId: 1 });
      expect(response).toEqual(testTasks);
    });
    describe("with search term", () => {
      it("should call find with searchTerm when exist", async () => {
        const response = await findByUser(1, "term");
        //@ts-ignore
        expect(mockedTaskModel.find).toHaveBeenCalledWith({
          authorId: 1,
          $text: { $search: "term" },
        });
      });
    });
  });
});
