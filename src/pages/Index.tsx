
import TodoApp from '../components/TodoApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Interactive Todo List
          </h1>
          <p className="text-gray-600">
            Stay organized and get things done
          </p>
        </div>
        <TodoApp />
      </div>
    </div>
  );
};

export default Index;
