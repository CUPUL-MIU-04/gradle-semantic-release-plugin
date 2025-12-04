// Tests para gradle.ts
import { runGradle } from '../../src/gradle';
import { execa } from 'execa';
import * as fs from 'fs-extra';

// Mocks
jest.mock('execa');
jest.mock('fs-extra');

const mockedExeca = execa as jest.MockedFunction<typeof execa>;
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('runGradle', () => {
  const mockOptions = {
    cwd: '/test/path',
    gradleCommand: './gradlew',
    gradleOptions: ['--stacktrace'],
    gradleProperties: { version: '1.0.0' },
    logger: {
      log: jest.fn(),
      error: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFs.pathExists.mockResolvedValue(true);
    mockedFs.chmod.mockResolvedValue();
    mockedExeca.mockResolvedValue({
      stdout: 'Gradle output',
      stderr: '',
    } as any);
  });

  it('should execute gradle command with correct arguments', async () => {
    await runGradle('build', mockOptions);

    expect(mockedExeca).toHaveBeenCalledWith(
      './gradlew',
      ['-Pversion=1.0.0', '--stacktrace', 'build', '--stacktrace'],
      {
        cwd: '/test/path',
        stdio: 'pipe',
      }
    );
  });

  it('should make gradlew executable when using wrapper', async () => {
    await runGradle('build', mockOptions);

    expect(mockedFs.pathExists).toHaveBeenCalledWith('/test/path/gradlew');
    expect(mockedFs.chmod).toHaveBeenCalledWith('/test/path/gradlew', 0o755);
  });

  it('should log stdout and stderr', async () => {
    mockedExeca.mockResolvedValue({
      stdout: 'Build successful',
      stderr: 'Warning: something',
    } as any);

    await runGradle('build', mockOptions);

    expect(mockOptions.logger.log).toHaveBeenCalledWith('Build successful');
    expect(mockOptions.logger.error).toHaveBeenCalledWith('Warning: something');
  });

  it('should handle missing gradleProperties', async () => {
    const options = {
      ...mockOptions,
      gradleProperties: undefined,
    };

    await runGradle('build', options);

    expect(mockedExeca).toHaveBeenCalledWith(
      './gradlew',
      ['--stacktrace', 'build', '--stacktrace'],
      {
        cwd: '/test/path',
        stdio: 'pipe',
      }
    );
  });
});
